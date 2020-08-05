import { Component, OnInit, Inject } from '@angular/core';
import { RoleWithPermissions } from 'src/app/models/role';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UsersService } from '../../users.service';
import { AuthService } from 'src/app/security/auth.service';
import { TableAction, TableEmittedAction } from 'src/app/shared/data-table/data-table.component';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css'],
})
export class UserRoleComponent implements OnInit {
  roles: RoleWithPermissions[];

  constructor(
    public dialogRef: MatDialogRef<UserRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userService.listRoles().subscribe((roles) => {
      this.roles = roles.filter((role) => role.level >= this.authService.user.role.level);
      console.log(this.roles);
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onChangeRole(role: RoleWithPermissions) {
    this.userService.updateRole(this.data.user.id, role.id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
