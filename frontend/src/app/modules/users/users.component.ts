import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuService } from '../menu/menu.service';
import { User } from './../../models/user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  users$: Observable<User[]>;
  columnNames: any;

  constructor(private usersService: UsersService) {
    this.columnNames = { name: 'Nome', email: 'E-mail', role_name: 'Papel' };

    this.users$ = this.usersService.getAllUsers().pipe(
      map(users => users.map(user => ({ ...user, role_name: user.role.name }))));
  }

  ngOnInit(): void {
    MenuService.menu.title.next('Responsive -> Users');
  }
}
