import { OnInit, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';
import { UsersService } from '../../users/users.service';
import { PermissionGuard } from 'src/app/security/permission.guard';
import { TableEmittedAction } from 'src/app/shared/data-table/data-table.component';
import { SolicitationsService } from '../solicitations.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Solicitation } from 'src/app/models/solicitation';

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

  actions = [
    {
      name: 'assign',
      label: 'Atribuir',
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<SolicitationsAssignableUsersComponent, SolicitationsAssignableUsersComponentResult>,
    @Inject(MAT_DIALOG_DATA) public data: SolicitationsAssignableUsersComponentData,
    private usersService: UsersService,
    private solicitationsService: SolicitationsService
  ) {}

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

  onAction(event: TableEmittedAction) {
    this.solicitationsService.assignToUser(this.data.solicitationId, event.element.id).subscribe({
      next: (data) => this.dialogRef.close(data),
      error: (error) => this.dialogRef.close({ error: error }),
    });
  }
}

export type SolicitationsAssignableUsersComponentData = { solicitationId: number };

export type SolicitationsAssignableUsersComponentResult = Solicitation | { error: any };

type UserRow = Pick<User, 'id' | 'name'> | { roleName?: string };
