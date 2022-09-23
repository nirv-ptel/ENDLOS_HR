import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from '../../@model/user/user.model';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: UserModel;

  constructor(private http: HttpClient, private _router: Router) {
    if (this.isLoggedIn()) {
      this.user = this.getUser(this.getToken());
    }
  }
  url = `${apiUrl.url}/endlos/user`;

  login(user: any): Observable<any> {
    return this.http.post(`${this.url}/signin`, user);
  }

  loginuser(token) {
    localStorage.setItem('token', token.token);
    this.user = this.getUser(token.token);
    return false;
  }

  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token == null) {
      return false;
    }
    else {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private getUser(token: string): UserModel {
    return JSON.parse(atob(token.split('.')[1])) as UserModel;
  }
}
