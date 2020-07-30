import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { PermissionGuard } from './permission.guard';
import { DisableIfUnauthorizedDirective } from './directives/disable-if-unauthorized.directive';
import { HideIfUnauthorizedDirective } from './directives/hide-if-unauthorized.directive';
import { httpInterceptorProviders } from './interceptors';


@NgModule({
  declarations: [
    DisableIfUnauthorizedDirective,
    HideIfUnauthorizedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DisableIfUnauthorizedDirective,
    HideIfUnauthorizedDirective
  ],
  providers: [
    AuthService,
    AuthGuard,
    PermissionGuard,
    httpInterceptorProviders,
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.reauth(),
      deps: [AuthService],
      multi: true
    }
  ]
})
export class SecurityModule { }
