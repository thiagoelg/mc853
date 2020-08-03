import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserWithRole } from 'src/app/models/user';
import { UsersService } from './../users.service';
import { AuthService } from 'src/app/security/auth.service';
import { RoleWithPermissions } from 'src/app/models/role';
import { PermissionGuard } from 'src/app/security/permission.guard';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  id: number;
  user: UserWithRole = null;
  canEdit: boolean = false;
  roles: Array<RoleWithPermissions> = [];
  selectedRoleId: number;
  selectedRole: RoleWithPermissions;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.canEdit = this.authService.hasPermissions([PermissionGuard.PERMISSIONS.MANAGE_USERS]);
  }

  ngOnInit(): void {
    this.listRoles().then(() => {
      this.loadUser();
    });
  }

  listRoles(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.usersService.listRoles().subscribe({
        next: (roles) => {
          this.roles = roles;
          resolve();
        },
        error: reject
      });
    })
  }

  loadRole() {
    this.selectedRole = this.roles.find(role => role.id === this.selectedRoleId);
  }

  loadUser() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.id) {
      this.id = this.authService.user.id;
      this.user = this.authService.user;
      this.selectedRoleId = this.user.role.id;
      this.loadRole();
    } else {
      this.usersService.getUser(this.id).subscribe({
        next: (user) => {
          this.user = user;
          this.selectedRoleId = this.user.role.id;
          this.loadRole();
        }
      });
    }
  }

}
