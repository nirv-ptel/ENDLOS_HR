import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  url = `${apiUrl.url}/endlos`;

  CreateMainCategory(category:any): Observable<any> {
    return this.http.post(`${this.url}/category`, category);
  }
  ViewMainCategory(): Observable<any> {
    return this.http.get(`${this.url}/category`);
  }
  MainCategoryByID(Id: number): Observable<any> {
    return this.http.get(`${this.url}/category/${Id}`);
  }
  ViewMainCategoryWithFilter(Filter: any): Observable<any> {
    return this.http.post(`${this.url}/category/filter`,Filter);
  }

  CreateSubCategory(category:any): Observable<any> {
    return this.http.post(`${this.url}/subCategory`, category);
  }
  ViewSubCategory(): Observable<any> {
    return this.http.get(`${this.url}/subCategory`);
  }
  SubCategoryByID(Id: number): Observable<any> {
    return this.http.get(`${this.url}/subCategory/${Id}`);
  }
  ViewSubCategoryWithFilter(Filter: any): Observable<any> {
    return this.http.post(`${this.url}/subCategory/filter`,Filter);
  }

  CreateSubCategoryDetail(categoryDetail:any): Observable<any> {
    return this.http.post(`${this.url}/subcategoryDetails`, categoryDetail);
  }
}
