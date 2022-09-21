import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbLoginComponent } from '@nebular/auth';
import { LoginService } from '../../@service/auth/login.service';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NbxLogoutComponent implements OnInit{

    constructor(private _login: LoginService, private _router: Router) {}
    ngOnInit() {
        this._login.logout();
        this._router.navigate(['']);
    }
    
}
