import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/global/pt';
import { LOCALE_ID, NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './interceptors';
import { MenuModule } from './modules/menu/menu.module';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { PermissionGuard } from './guards/permission.guard';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    LoginLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AppMaterialModule,
    HttpClientModule,
    MenuModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    AuthService,
    AuthGuard,
    PermissionGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.reauth(),
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
