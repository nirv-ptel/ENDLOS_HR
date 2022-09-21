import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthService, NbLoginComponent, NbTokenService, NbTokenStorage } from '@nebular/auth';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LoginService } from '../../@service/auth/login.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _login: LoginService,
    private _router: Router,
    private toastrService: NbToastrService
  ) { }

  loginForm: FormGroup;
  show: boolean = false;

  ngOnInit() {
    this.loginForm = this._fb.group({
      mobilenumber: ['', [Validators.required, Validators.pattern]],
      password: ['', Validators.required],
    });

    if (this._login.isLoggedIn()) {
      this._router.navigate(['pages']);
    }
  }

  NumberOnly(event) {
    if (!(event.which >= 48 && event.which <= 57) && !(event.which >= 96 && event.which <= 105) && (event.which != 9 && event.which != 8 && event.which != 46 && event.which != 37 && event.which != 39)) {
      event.preventDefault();
    }
  }

  password() {
    this.show = !this.show;
  }

  login() {
    this._login.login(this.loginForm.value).subscribe(
      (Response: any) => {
        this._login.loginuser(Response);
        this._router.navigate(['pages']);
      },
      (error: any) => {
        this.showToast('danger');
      }
    )
  }


  private showToast(type: NbComponentStatus) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      "Username & Password Not Found!",
      `LOGIN `,
      config);
  }



}
