import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  static PERMISSIONS: { [key: string]: string } = {
    MANAGE_ROLES: 'manage_roles',
    ASSIGN_ROLES: 'assign_roles',
    MANAGE_USERS: 'manage_users',
    MANAGE_FORMS: 'manage_forms',
    MANAGE_FORM_FIELDS: 'manage_form_fields',
    MANAGE_FORM_FIELD_TYPES: 'manage_form_field_types',
    MANAGE_SOLICITATIONS: 'manage_solicitations',
    ANSWER_SOLICITATION: 'answer_solicitation',
    CREATE_SOLICITATION: 'create_solicitation',
    REOPEN_SOLICITATION: 'reopen_solicitation',
    ANSWER_SATISFACTION_SURVEY: 'answer_satisfaction_survey'
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredPermissions = next?.data?.permissions;
    if (!requiredPermissions.length) return true;

    if (this.authService.hasPermissions(requiredPermissions)) {
      return true;
    }

    this.router.navigate(['/']);

    return false;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
