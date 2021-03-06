import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Login } from '../models/login';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Permission } from '../models/permission';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public token: string;
  public user: User;
  public userPermissions: { [key: string]: boolean } = {};
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    const savedToken = localStorage.getItem('token');
    this.token = savedToken || null;

    const savedUser = localStorage.getItem('user');
    this.user = (savedUser && (JSON.parse(savedUser) as User)) || null;

    if (this.token && this.user) {
      this.setUserPermissions(this.user);
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
          error: console.log,
        });
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
    this.user = null;
    this.userPermissions = {};
    this.token = null;
    this.router.navigate(['/login']);
  }

  reauth(): Promise<any> {
    const url = 'auth/reauth';
    if (!this.token || !this.user) {
      return Promise.resolve();
    }
    return this.http
      .post(url, null)
      .toPromise()
      .then(() => {
        this.loggedIn.next(true);
      })
      .catch(() => {
        this.logout();
      });
  }

  getSelf(): Observable<User> {
    const url = 'users/me';
    return this.http.get<User>(url).pipe(
      take(1),
      map((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
        this.setUserPermissions(this.user);
        return user;
      })
    );
  }

  setUserPermissions(user: User) {
    user.permissions.forEach((permission: Permission) => {
      this.userPermissions[permission.short_name] = true;
    });
  }

  hasAllPermissions(permissions: Array<string>) {
    if (!this.userPermissions) return false;
    return permissions.every((permission) => this.userPermissions[permission]);
  }

  hasEitherPermission(permissions: Array<string>) {
    if (!this.userPermissions) return false;
    return permissions.filter((permission) => this.userPermissions[permission]).length > 0;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
