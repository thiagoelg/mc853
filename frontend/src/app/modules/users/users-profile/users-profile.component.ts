import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from './../users.service';
import { AuthService } from 'src/app/security/auth.service';
import { RoleWithPermissions } from 'src/app/models/role';
import { PermissionGuard } from 'src/app/security/permission.guard';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { UserImageComponent } from './user-image/user-image.component';
import { UserRoleComponent } from './user-role/user-role.component';

@Component({
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css'],
})
export class UsersProfileComponent implements OnInit {
  id: number;
  user: User = null;
  canEdit: boolean = false;
  roles: Array<RoleWithPermissions> = [];
  selectedRoleId: number;
  selectedRole: RoleWithPermissions;
  baseUrl: string = environment.backend;
  userImageUrl: string;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

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
        error: reject,
      });
    });
  }

  loadRole() {
    this.selectedRole = this.roles.find((role) => role.id === this.selectedRoleId);
  }

  loadUser() {
    this.id = Number(this.route.snapshot.paramMap.get('id')) || this.authService.user.id;
    this.usersService.getUser(this.id).subscribe({
      next: (user) => {
        this.user = user;
        if (this.user.profile_image) {
          this.userImageUrl = `${this.baseUrl}/files/${user.profile_image.id}/${user.profile_image.name}`;
        } else {
          this.userImageUrl = 'assets/images/profile.jpg';
        }
        this.selectedRoleId = this.user.role.id;
        this.loadRole();
        this.canEdit =
          this.authService.hasAllPermissions([PermissionGuard.PERMISSIONS.MANAGE_USERS]) &&
          this.authService.user.role.level <= this.user.role.level &&
          this.user.id !== this.authService.user.id;
      },
    });
  }

  onEditUserImage() {
    const dialogRef = this.dialog.open(UserImageComponent, {
      width: '340px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadUser();
    });
  }

  onEditUserRole() {
    const dialogRef = this.dialog.open(UserRoleComponent, {
      minWidth: '340px',
      width: '400px',
      data: { user: this.user },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadUser();
    });
  }
}
