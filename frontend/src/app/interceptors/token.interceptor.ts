import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './../app.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: string;

  constructor() {
    AppService.token.subscribe({ next: (value) => (this.token = value) });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!!this.token && !request.url.startsWith('auth/')) {
      const req = request.clone({
        headers: request.headers.append('Authorization', `Bearer ${this.token}`),
      });

      return next.handle(req);
    }

    return next.handle(request);
  }
}
