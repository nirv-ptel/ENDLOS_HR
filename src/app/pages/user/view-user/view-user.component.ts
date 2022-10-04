import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { CategoryService } from '../../../@service/category/category.service';
import { UserService } from '../../../@service/user/user.service';
import { UserTimeSheetComponent } from '../user-time-sheet/user-time-sheet.component';

@Component({
  selector: 'ngx-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  admin: boolean = false;
  leaveEdit: boolean = false;
  leaveEditUser = null;
  FilterForm: FormGroup;
  UserSource: any = [];
  page: number = 1;
  itemsPerPage = 5;
  totalItems: any;
  key: string = 'createdDate';
  reverse: boolean = false;

  NbDialogRef: any;

  constructor(
    private _router: Router,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private _auth: LoginService,
    private _mainCategory: CategoryService,
    private _user: UserService
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
    this.ViewMainUserPage(1);
  }

  btnClick(event) {
    this.leaveEditUser = event;
    // this.leaveEdit = true;
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

  ViewMainUserPage(pages: number) {
    this.FilterForm.get('page').setValue(pages - 1);
    this.FilterForm.get('size').setValue(this.itemsPerPage);
    this._user.ViewUser(this.FilterForm.value).subscribe((data: any) => {

      this.UserSource = data.content;
      this.page = pages;
      this.totalItems = data.totalElements;
    })
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  refreshCountries() {
    this.ViewMainUserPage(1);
  }
  openUsetTimeDetails(event) {
    this._router.navigateByUrl(`pages/user/one-user/${event}`);
    // this.NbDialogRef = this.dialogService.open(
    //   UserTimeSheetComponent,
    //   {
    //     context: {
    //       UserId: event
    //     },
    //     closeOnBackdropClick: false,
    //   }).onClose.subscribe((data) => {
    //     this.ngOnInit();
    //   }
    //   )
  }

}
