import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserWithRole } from 'src/app/models/user';
import { UsersService } from './../users.service';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  id: number;
  user$: BehaviorSubject<UserWithRole> = new BehaviorSubject<UserWithRole>(null);
  canEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.id = this.authService.user.id;
      this.user$.next(this.authService.user);
    } else {
      this.usersService.getUser(this.id).subscribe({
        next: (user) => {
          this.user$.next(user);
          this.canEdit = true;
        }
      });
    }
  }

}
