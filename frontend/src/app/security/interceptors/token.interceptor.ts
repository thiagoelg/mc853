import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;

    if (!!token && !request.url.startsWith('auth/')) {
      const req = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
      return next.handle(req);
    }

    return next.handle(request);
  }
}
