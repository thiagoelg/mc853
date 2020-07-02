import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  }, {
    path: 'solicitations',
    loadChildren: () => import('./modules/solicitations/solicitations.module').then(m => m.SolicitationsModule)
  }, {
    path: 'overview',
    loadChildren: () => import('./modules/overview/overview.module').then(m => m.OverviewModule)
  },

  { path: 'forms', loadChildren: () => import('./modules/forms/forms.module').then(m => m.FormsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
