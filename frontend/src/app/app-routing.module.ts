import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { PermissionGuard } from './guards/permission.guard';
import { OverviewModule } from './modules/overview/overview.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { RegisterModule } from './modules/register/register.module';
import { SolicitationsModule } from './modules/solicitations/solicitations.module';
import { FormsModule } from './modules/forms/forms.module';
import { LogoutModule } from './modules/logout/logout.module';
import { LoginModule } from './modules/login/login.module';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => OverviewModule
      },
      {
        path: 'admin',
        loadChildren: () => AdminModule,
        canActivate: [PermissionGuard],
        data: { permissions: AdminModule.requiredPermissions }
      },
      {
        path: 'register',
        loadChildren: () => RegisterModule
      },
      {
        path: 'users',
        loadChildren: () => UsersModule,
        canActivate: [PermissionGuard],
        data: { permissions: UsersModule.requiredPermissions }
      },
      {
        path: 'solicitations',
        loadChildren: () => SolicitationsModule
      },
      { 
        path: 'forms',
        loadChildren: () => FormsModule
      },
      {
        path: 'logout',
        loadChildren: () => LogoutModule
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => LoginModule
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
