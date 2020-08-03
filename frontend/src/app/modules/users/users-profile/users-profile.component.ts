import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from './../users.service';
import { AuthService } from 'src/app/security/auth.service';
import { RoleWithPermissions } from 'src/app/models/role';
import { PermissionGuard } from 'src/app/security/permission.guard';
import { FileUploadService } from 'src/app/shared/file-upload/file-upload.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {
  id: number;
  user: User = null;
  canEdit: boolean = false;
  roles: Array<RoleWithPermissions> = [];
  selectedRoleId: number;
  selectedRole: RoleWithPermissions;
  newUserImage: File;
  baseUrl: string = environment.backend;
  userImageUrl: string;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private authService: AuthService,
    private fileUploadSerivce: FileUploadService
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
          this.userImageUrl = `${this.baseUrl}/files/${user.profile_image.id}/${user.profile_image.name}`;
          this.selectedRoleId = this.user.role.id;
          this.loadRole();
        }
      });
    }
  }

  onUploadImage() {
    console.log(this.newUserImage);
    if (this.newUserImage) {
      this.fileUploadSerivce.uploadFile(this.newUserImage);
    }
  }
}
