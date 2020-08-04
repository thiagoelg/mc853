import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuService } from '../menu.service';
import { UsersComponent } from '../../users/users.component';
import { AuthService } from '../../../security/auth.service';
import { User } from '../../../models/user';

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
      name: 'Solicitações',
      icon: '',
      path: ['/solicitations/list'], permissions: []
    },
    { 
      name: 'Formulários',
      icon: '',
      path: ['/forms/list'], permissions: []
    },
    { 
      name: 'Questões',
      icon: '',
      path: ['/forms/questions/list'], permissions: []
    },
    { 
      name: 'Tipos de resposta',
      icon: '',
      path: ['/forms/response-types'], permissions: []
    },
    { 
      name: 'Usuários',
      icon: '',
      path: ['/users/list'], permissions: UsersComponent.requiredPermissions
    },
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
}
