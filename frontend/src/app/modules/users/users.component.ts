import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuService } from '../menu/menu.service';
import { User } from './../../models/user';
import { UsersService } from './users.service';
import { PermissionGuard } from 'src/app/security/permission.guard';
import { RequiredPermissions } from 'src/app/models/permission';
import { TableAction, TableEmittedAction } from 'src/app/shared/data-table/data-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent extends RequiredPermissions implements OnInit {
  static requiredPermissions = [
    PermissionGuard.PERMISSIONS.MANAGE_USERS
  ];
  users$: Observable<User[]>;
  columnNames: any;
  actions: TableAction[] = [
    {
      name: 'edit',
      label: 'Editar',
      icon: 'edit'
    }
  ];

  constructor(private usersService: UsersService, private router: Router) {
    super();
    this.columnNames = { name: 'Nome', email: 'E-mail', role_name: 'Perfil' };

    this.users$ = this.usersService.getAllUsers().pipe(
      map(users => users.map(user => ({ ...user, role_name: user.role.name }))));
  }

  ngOnInit(): void {
    MenuService.menu.title.next('Responsive -> Users');
  }

  onAction(event: TableEmittedAction) {
    const { action, element } = event;
    if (action === 'edit') {
      this.router.navigate(['/users', element.id]);
    }
  }
}
