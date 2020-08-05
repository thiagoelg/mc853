import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { UsersService } from '../../users/users.service';
import { PermissionGuard } from 'src/app/security/permission.guard';

@Component({
  templateUrl: './solicitations-assignable-users.component.html',
  styleUrls: ['./solicitations-assignable-users.component.css'],
})
export class SolicitationsAssignableUsersComponent implements OnInit {
  rows$: Observable<UserRow[]>;

  columnNames = {
    id: 'Número',
    name: 'Nome',
    roleName: 'Perfil de acesso',
  };

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.rows$ = this.usersService.getUsersWithPermission(PermissionGuard.PERMISSIONS.ANSWER_SOLICITATION).pipe(
      map((users) =>
        users.map((user) => ({
          id: user.id,
          name: user.name,
          roleName: user.role?.name,
        }))
      )
    );
  }
}

type UserRow = Pick<User, 'id' | 'name'> | { roleName?: string };
