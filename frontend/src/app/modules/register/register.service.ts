import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from './../../models/user';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(body: Partial<User>): Observable<void> {
    const url = 'users/register';

    return this.http.post(url, body).pipe(
      take(1),
      map((_) => {})
    );
  }
}
