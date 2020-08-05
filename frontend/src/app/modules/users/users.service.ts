import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from './../../models/user';
import { RoleWithPermissions } from 'src/app/models/role';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    const url = 'users';

    return this.http.get<User[]>(url).pipe(take(1));
  }

  getUser(id: number): Observable<User> {
    const url = `users/${id}`;

    return this.http.get<User>(url).pipe(take(1));
  }

  getUsersWithPermission(permissionShortName: string): Observable<User[]> {
    return this.getAllUsers().pipe(
      map((users) =>
        users.filter((user) => {
          if (user.permissions == null) {
            return false;
          }

          return user.permissions.find((permission) => permission.short_name === permissionShortName) !== undefined;
        })
      )
    );
  }

  updateRole(userId: number, roleId: number): Observable<User> {
    const url = `users/${userId}/role`;
    return this.http
      .put<User>(url, { role_id: roleId })
      .pipe(take(1));
  }

  updateImage(userId: number, profileImageId: number): Observable<User> {
    const url = `users/${userId}/profile_image`;
    return this.http
      .put<User>(url, { profile_image_id: profileImageId })
      .pipe(take(1));
  }

  listRoles(): Observable<Array<RoleWithPermissions>> {
    const url = 'roles';
    return this.http.get<Array<RoleWithPermissions>>(url).pipe(take(1));
  }
}
