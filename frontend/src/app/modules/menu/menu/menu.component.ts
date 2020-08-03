import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MenuService } from '../menu.service';
import { AdminModule } from '../../admin/admin.module';
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
    { name: 'Solicitations', path: ['/solicitations'], permissions: [] },
    { name: 'Solicitations Create', path: ['/solicitations/create'], permissions: [] },
    { name: 'Admin', path: ['/admin'], permissions: AdminModule.requiredPermissions },
    { name: 'Forms', path: ['/forms'], permissions: [] },
    { name: 'Questions', path: ['/forms/questions'], permissions: [] },
    { name: 'ResponseTypes', path: ['/forms/response-types'], permissions: [] },
    { name: 'Users', path: ['/users/list'], permissions: UsersComponent.requiredPermissions },
    { name: 'Register', path: ['/register'], permissions: [] }
  ]

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay()
  );
}
