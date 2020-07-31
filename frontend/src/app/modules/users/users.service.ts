import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserWithRole } from './../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserWithRole[]> {
    const url = 'users';

    return this.http.get<UserWithRole[]>(url).pipe(take(1));
  }

  getUser(id: number): Observable<UserWithRole> {
    const url = `users/${id}`;

    return this.http.get<UserWithRole>(url).pipe(take(1));
  }

  updateRole(userId: number, roleId: number): Observable<UserWithRole> {
    const url = `users/${userId}/assign_role`;
    return this.http.put<UserWithRole>(url, { role_id: roleId }).pipe(take(1));
  }
}
