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
    return this.http.get(`${this.url}/user/${Uid}`)
  }
}
