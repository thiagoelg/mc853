import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { UsersComponent } from './users.component';
import { PermissionGuard } from 'src/app/security/permission.guard';
import { UserNewComponent } from './user-new/user-new.component';


const routes: Routes = [
  {
    path: 'profile',
    component: UsersProfileComponent
  },
  {
    path: 'new',
    component: UserNewComponent,
    canActivate: [PermissionGuard],
    data: { permissions: UsersComponent.requiredPermissions }
  },
  {
    path: 'list',
    component: UsersComponent,
    canActivate: [PermissionGuard],
    data: { permissions: UsersComponent.requiredPermissions }
  },
  { 
    path: ':id',
    component: UsersProfileComponent,
    canActivate: [PermissionGuard],
    data: { permissions: UsersComponent.requiredPermissions }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
