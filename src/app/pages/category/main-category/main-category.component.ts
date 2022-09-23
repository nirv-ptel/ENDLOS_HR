import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { CategoryService } from '../../../@service/category/category.service';
import { SubCategoryComponent } from '../sub-category/sub-category.component';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface Category {
    name: string;
    children?: Category[];
}

interface SubCategory {
    name: number;
}

@Component({
    selector: 'ngx-main-category',
    templateUrl: './main-category.component.html',
    styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {

    MainCategoryForm: FormGroup;
    FilterForm: FormGroup;

    MainCategorySource: [];
    admin: boolean = false;
    NbDialogRef = null;

    page: number = 1;
    itemsPerPage = 5;
    totalItems: any;
    key: string = 'createdDate';
    reverse: boolean = false;

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

    constructor(
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
        this.FilterForm = this.fb.group({
            page: [null],
            size: [null]
        })
        this.ViewMainCategoryPage(1);
        this.MainCategoryForm = this.fb.group({
            categoryName: ['', Validators.required]
        })

    }

    AddFilterForm() {
        this.FilterForm.addControl('filters', this.fb.array([
            this.fb.group({
                key: [null],
                operator: [null],
                field_type: [null],
                value: [null],
                value_to: [null]
            })
        ]))
    }

    CreateCategory(dialog: TemplateRef<any>) {
        this.MainCategoryForm.reset();
        this.NbDialogRef = this.dialogService.open(
            dialog,
            {
                closeOnBackdropClick: false,
            });
    }

    openSubCategoryDetails(event) {
        this.NbDialogRef = this.dialogService.open(
            SubCategoryComponent,
            {
                context: {
                    MainCtegoryID: event
                },
                closeOnBackdropClick: false,
            }).onClose.subscribe((data) => {
                this.ngOnInit();
            }
            )
    }

    onCategoryFormSubmit() {
        this._mainCategory.CreateMainCategory(this.MainCategoryForm.value).subscribe((data: any) => {
            this.MainCategoryForm.reset();
            this.allAlert('success', `${data.Data.categoryName} Created !`, 'Successfully Create Category');
            this.NbDialogRef.close();
            this.ngOnInit();
        },
            (error: Error) => {
                this.allAlert('danger', `Not Created !`, `something wrong`);
            });
    }

    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
    }

    refreshCountries() {
        this.ViewMainCategoryPage(1);
    }

    ViewMainCategoryPage(pages: number) {
        this.FilterForm.get('page').setValue(pages - 1);
        this.FilterForm.get('size').setValue(this.itemsPerPage);
        this._mainCategory.ViewMainCategoryWithFilter(this.FilterForm.value).subscribe((data: any) => {
            console.warn(data.Data.content);
            this.MainCategorySource = data.Data.content;
            this.page = pages;
            this.totalItems = data.Data.totalElements;
        })
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
