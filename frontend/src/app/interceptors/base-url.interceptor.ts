import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  baseUrl = 'https://responsive-api.herokuapp.com/api/';
  // baseUrl = 'http://localhost:9001/api/';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      url: this.baseUrl + request.url,
    });
    return next.handle(req);
  }
}
