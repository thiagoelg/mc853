import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const parseDates = (body) => {
  if (body instanceof Array) {
    body = body.map((item) => {
      if (item.created_at && item.updated_at) {
        item.created_at = new Date(item.created_at);
        item.updated_at = new Date(item.updated_at);
      }
      return item;
    });
  } else {
    if (body.created_at && body.updated_at) {
      body.created_at = new Date(body.created_at);
      body.updated_at = new Date(body.updated_at);
    }
  }
  return body;
}

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  // baseUrl = 'https://responsive-api.herokuapp.com/api/';
  baseUrl = environment.backend;

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      url: this.baseUrl + request.url,
    });
    return next.handle(req).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: parseDates(event.body )})
        }
        return event;
      })
    );
  }
}
