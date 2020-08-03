import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method.toUpperCase() === 'GET') {
      return next.handle(request);
    }

    let req = request;
    
    if (request.headers.has('ignore-content-type')) {
      req = request.clone({ headers: request.headers.delete('ignore-content-type') });
    } else {
      req = request.clone({
        setHeaders: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }

    return next.handle(req);
  }
}
