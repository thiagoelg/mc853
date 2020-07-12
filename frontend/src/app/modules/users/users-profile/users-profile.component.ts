import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserWithRole } from 'src/app/models/user';
import { UsersService } from './../users.service';

@Component({
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  id: number;
  user$: Observable<UserWithRole>;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user$ = this.usersService.getUser(this.id);
  }

}
