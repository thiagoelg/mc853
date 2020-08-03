import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { UsersComponent } from './users.component';
import { PermissionGuard } from 'src/app/security/permission.guard';


const routes: Routes = [
  {
    path: 'profile',
    component: UsersProfileComponent
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
