import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../@service/auth/login.service';

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
  
  constructor(
    private fb: FormBuilder,
    private _auth: LoginService,
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
      city: [null],
      currentAddress: [null],
      permanentAddress: [null],
      bankName: [null],
      accountNumber: [null],
      ifscCode: [null],
    })

  }

  onUserFormSubmit() {

  }

}
