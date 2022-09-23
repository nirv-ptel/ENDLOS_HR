import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { CategoryService } from '../../../@service/category/category.service';

@Component({
    selector: 'ngx-sub-category',
    templateUrl: './sub-category.component.html',
    styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

    admin: boolean = false;
    NbDialogRef = null;

    MainCategorySource: [];
    SubCategorySource: [];
    SubCategoryForm: FormGroup;

    @Input() MainCtegoryID: number;

    settings = {
        actions: false,
        columns: {
            cid: {
                title: 'ID',
                type: 'number',
            },
            categoryName: {
                title: 'Product Unit',
                type: 'string',
            },
        },
    };

    MainCategoryDetails = {
        MainId: null,
        MainName: null,
    }

    constructor(
        protected ref: NbDialogRef<SubCategoryComponent>,
        private dialogService: NbDialogService,
        private fb: FormBuilder,
        private _auth: LoginService,
        private _mainCategory: CategoryService,
        private toastrService: NbToastrService
    ) { }

    ngOnInit(): void {
        let role = this._auth.user.roles.find((x => x));
        if (role == 'ROLE_ADMIN') {
            this.admin = true;
        }


        this._mainCategory.MainCategoryByID(this.MainCtegoryID).subscribe((data: any) => {
            this.MainCategoryDetails.MainId = data.Data.cid;
            this.MainCategoryDetails.MainName = data.Data.categoryName;
            let id = data.Data.cid;

            if (id == null) {
                this.ref.close();
            }
        }, (error: any) => {
            this.ref.close();
        });

        this.SubCategoryForm = this.fb.group({
            categoryName: ['', Validators.required],
            categoryData: this.fb.group({
                cid: [this.MainCtegoryID, Validators.required]
            })
        })

        this._mainCategory.ViewMainCategory().subscribe((data: any) => {
            console.warn(data.Data);
            this.MainCategorySource = data.Data;
        })
    }
    dismiss() {
        this.ref.close();
    }

    onCategoryFormSubmit() {
        console.warn(this.SubCategoryForm.value);
        this._mainCategory.CreateSubCategory(this.SubCategoryForm.value).subscribe((data: any) => {
            this.SubCategoryForm.reset();
            console.warn(data);
            this.allAlert('success', `${data.Data.categoryName} Created !`, 'Successfully Create Category');
            this.ref.close();
            this.ngOnInit();
        },
            (error: Error) => {
                this.allAlert('danger', `Not Created !`, `something wrong`);
            });
    }

    allAlert(alertMsg, headMsg, msg) {
        const config = {
            status: alertMsg,
            destroyByClick: true,
            duration: 3000,
            hasIcon: true,
            position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
            preventDuplicates: false,
        };
        this.toastrService.show(
            `${msg}`,
            `${headMsg}`,
            config);
    }
}
