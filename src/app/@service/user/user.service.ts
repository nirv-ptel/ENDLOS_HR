import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/endlos`;

  ViewUserProfile(Uid:any): Observable<any> {
    return this.http.get(`${this.url}/user/${Uid}`);
  }

  CreateUser(user: any): Observable<any> {
    return this.http.post(`${this.url}/user/dummy/signup`, user);
  }

  ViewUser(Filter: any): Observable<any> {
    return this.http.post(`${this.url}/user/user/filter`, Filter);
  }

  UserTime(time: any): Observable<any> {
    return this.http.post(`${this.url}/timing`, time);
  }

  UpdateUserTime(Tid: number, time: any): Observable<any> {
    return this.http.patch(`${this.url}/timing/${Tid}`, time);
  }

  CreateSalary(salary: any): Observable<any> {
    return this.http.post(`${this.url}/salary`, salary);
  }
}
