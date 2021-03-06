import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/auth.guard';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { OverviewModule } from './modules/overview/overview.module';
import { UsersModule } from './modules/users/users.module';
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
        path: 'users',
        loadChildren: () => UsersModule
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
      },
      {
        path: 'register',
        loadChildren: () => RegisterModule
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
