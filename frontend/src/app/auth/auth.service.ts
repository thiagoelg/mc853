import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Login } from '../models/login';
import { UserWithRole } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string;
  public user: UserWithRole;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const savedToken = localStorage.getItem('token');
    this.token = savedToken || null;

    const savedUser = localStorage.getItem('user');
    this.user = JSON.parse(savedUser) as UserWithRole || null;

    if (this.token && this.user) {
      this.loggedIn = new BehaviorSubject<boolean>(true);
    }
  }

  login(body: Login): Observable<void> {
    const url = 'auth/login';

    return this.http.post(url, body).pipe(
      take(1),
      map((token: string) => {
        localStorage.setItem('token', token);
        this.token = token;
      }),
      map(() => {
        this.getSelf().subscribe({
          next: () => {
            this.loggedIn.next(true);
            this.router.navigate(['/']);
          },
          error: console.log
        });
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getSelf(): Observable<void> {
    const url = 'users/me';
    return this.http.get<UserWithRole>(url).pipe(
      take(1),
      map((user: UserWithRole) => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
      })
    );
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
