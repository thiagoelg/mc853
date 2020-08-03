import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { SharedModule } from './../../shared/shared.module';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { RequiredPermissions } from 'src/app/models/permission';

@NgModule({
  declarations: [UsersComponent, UsersProfileComponent],
  imports: [CommonModule, AppMaterialModule, UsersRoutingModule, SharedModule],
})
export class UsersModule extends RequiredPermissions { }
