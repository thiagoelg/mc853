import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuService } from '../menu.service';
import { UsersComponent } from '../../users/users.component';
import { AuthService } from '../../../security/auth.service';
import { User } from '../../../models/user';
import { PermissionGuard } from 'src/app/security/permission.guard';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private breakpointObserver: BreakpointObserver, private authService: AuthService) { }

  user: User = this.authService.user;

  title$ = MenuService.menu.title.asObservable();
  items = [
    { 
      name: 'Início',
      icon: 'home',
      path: ['/'], permissions: []
    },
    { 
      name: 'Solicitações',
      icon: 'article',
      path: ['/solicitations/list'], permissions: []
    },
    { 
      name: 'Formulários',
      icon: 'dynamic_form',
      path: ['/forms/list'], permissions: [PermissionGuard.PERMISSIONS.MANAGE_FORMS]
    },
    { 
      name: 'Perguntas',
      icon: 'short_text',
      path: ['/forms/questions/list'], permissions: [PermissionGuard.PERMISSIONS.MANAGE_FORM_FIELDS]
    },
    { 
      name: 'Tipos de resposta',
      icon: 'grading',
      path: ['/forms/response-types/list'], permissions: [PermissionGuard.PERMISSIONS.MANAGE_FORM_FIELD_TYPES]
    },
    { 
      name: 'Usuários',
      icon: 'people',
      path: ['/users/list'], permissions: UsersComponent.requiredPermissions
    },
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
}
