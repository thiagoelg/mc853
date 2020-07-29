import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { PermissionGuard } from 'src/app/guards/permission.guard';
import { RequiredPermissionsModule } from 'src/app/models/permission';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule extends RequiredPermissionsModule {
  static requiredPermissions = [
    PermissionGuard.PERMISSIONS.MANAGE_ROLES
  ]
}
