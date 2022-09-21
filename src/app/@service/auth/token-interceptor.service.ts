import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private token: LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let to = this.token.getToken();
  let tokenizedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${to}`,
      // Access-Control-Allow-Origin: *,
    }
  })
  return next.handle(tokenizedReq);
  }
}
