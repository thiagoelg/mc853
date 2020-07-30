import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SecurityModule } from 'src/app/security/security.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    LayoutModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    SecurityModule
  ],
  exports: [MenuComponent],
})
export class MenuModule {}
