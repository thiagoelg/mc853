import { Component, Input, OnInit } from '@angular/core';
import { UserWithRole } from './../../../models/user';

@Component({
  selector: 'app-users-card',
  templateUrl: './users-card.component.html',
  styleUrls: ['./users-card.component.css'],
})
export class UsersCardComponent implements OnInit {
  @Input() user: UserWithRole;

  constructor() {}

  ngOnInit(): void {}
}
