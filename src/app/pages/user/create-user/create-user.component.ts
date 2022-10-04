import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../../@service/auth/login.service';
import { CategoryService } from '../../../@service/category/category.service';
import { UserService } from '../../../@service/user/user.service';

@Component({
  selector: 'ngx-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  UserForm: FormGroup;

  admin: boolean = false;
  // maintanance: boolean = false;
  // store: boolean = false;
  // gm: boolean = false;

  MainCategorySource: [];
  SubCategorySource: [];
  constructor(
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

    this.UserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [null],
      username: [null],
      email: [null],
      password: [null],
      mobileNumber: [null],
      aadharNumber: [null],
      salary: [null],
      salaryType: [null],
      bankName: [null],
      accountNumber: [null],
      ifscCode: [null],
      startDate: [null],
      leaveBalance: [null],
      categorys: this.fb.group({
        cid: [null, Validators.required]
      }),
      subCategorys: this.fb.group({
        sub_c_id: [null, Validators.required]
      }),
      userAddressList: this.fb.array([this.AddUserAddress()])
    })

    this._mainCategory.ViewMainCategory().subscribe((data: any) => {
      console.warn(data.Data);
      this.MainCategorySource = data.Data;

    })
  }

  AddressAdd() {
    this.AddAddressGet.push(this.AddUserAddress());
  }
  get AddAddressGet() {
    return this.UserForm.get('userAddressList') as FormArray;
  }
  AddAddressRemove(i: number) {
    if (i >= 1) {
      this.AddAddressGet.removeAt(i);
    }
  }
  AddUserAddress() {
    return this.fb.group({
      addressType: [null, Validators.required],
      locality: [null],
      city: [null],
      zipCode: [null],
      address: [null],
      state: [null]
    });
  }

  SubCategoryGet(event) {
    this.SubCategorySource = null;
    this._mainCategory.MainCategoryByID(event).subscribe((data: any) => {
      this.SubCategorySource = data.Data.subCategoryList;
    })
  }

  onUserFormSubmit() {
    console.warn(this.UserForm.value);
    this._user.CreateUser(this.UserForm.value).subscribe((data: any) => {
      console.warn(data);
      this.UserForm.reset();
      this.allAlert('success', `${data.username} Created !`, 'Successfully Created User');
    },
      (error: any) => {
        this.allAlert('danger', `Not Created !`, `something wrong`);
      })
  }

  NumberOnly(event) {
    if (!(event.which >= 48 && event.which <= 57) && !(event.which >= 96 && event.which <= 105) && (event.which != 8 && event.which !=
      46 && event.which != 9)) {
      event.preventDefault();
    }
  }

  StringOnly(event) {
    if ((event.which < 65 || event.which > 90) && (event.which < 97 || event.which > 122)&& (event.which != 8 && event.which !=
      46 && event.which != 9)) {
      event.preventDefault();
    }
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
