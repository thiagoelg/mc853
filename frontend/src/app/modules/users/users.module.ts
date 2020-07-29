import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { SharedModule } from './../../shared/shared.module';
import { UsersCardComponent } from './users-card/users-card.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { PermissionGuard } from 'src/app/guards/permission.guard';
import { RequiredPermissionsModule } from 'src/app/models/permission';

@NgModule({
  declarations: [UsersComponent, UsersProfileComponent, UsersCardComponent],
  imports: [CommonModule, AppMaterialModule, UsersRoutingModule, SharedModule],
})

export class UsersModule extends RequiredPermissionsModule {
  static requiredPermissions = [
    PermissionGuard.PERMISSIONS.MANAGE_USERS
  ]
}
