import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Login } from 'src/app/models/login';
import { AppService } from './../../app.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(body: Login): Observable<void> {
    const url = 'auth/login';

    return this.http.post(url, body).pipe(
      take(1),
      map((token: string) => {
        AppService.token.next(token);
      })
    );
  }
}
