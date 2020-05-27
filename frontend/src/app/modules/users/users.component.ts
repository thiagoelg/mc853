import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu/menu.service';
import { User } from './../../models/user';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private usersService: UsersService) {
    this.fetchAllUsers();
  }

  ngOnInit(): void {
    MenuService.menu.title.next('Responsive -> Users');
  }

  fetchAllUsers() {
    this.usersService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
}
