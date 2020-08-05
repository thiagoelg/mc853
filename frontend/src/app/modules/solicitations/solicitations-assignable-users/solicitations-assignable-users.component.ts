import { OnInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { SolicitationsService } from '../solicitations.service';

@Component({
  templateUrl: './solicitations-assignable-users.component.html',
  styleUrls: ['./solicitations-assignable-users.component.css'],
})
export class SolicitationsAssignableUsersComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private solicitationsService: SolicitationsService) {
    this.users$ = solicitationsService.fetchAssignableUsers();
  }

  ngOnInit() {}
}
