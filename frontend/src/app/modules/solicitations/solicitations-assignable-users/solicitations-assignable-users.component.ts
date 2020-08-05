import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { SolicitationsService } from '../solicitations.service';
import { map } from 'rxjs/operators';

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

  constructor(private solicitationsService: SolicitationsService) {
    this.rows$ = solicitationsService.fetchAssignableUsers().pipe(
      map((users) =>
        users.map((user) => ({
          id: user.id,
          name: user.name,
          roleName: user.role?.name,
        }))
      )
    );
  }

  ngOnInit() {}
}

type UserRow = Pick<User, 'id' | 'name'> | { roleName?: string };
