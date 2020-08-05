import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { SharedModule } from './../../shared/shared.module';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserImageComponent } from './users-profile/user-image/user-image.component';
import { UserNewComponent } from './user-new/user-new.component';
import { RegisterModule } from '../register/register.module';
import { UserRoleComponent } from './users-profile/user-role/user-role.component';

@NgModule({
  declarations: [UsersComponent, UsersProfileComponent, UserImageComponent, UserNewComponent, UserRoleComponent],
  imports: [CommonModule, AppMaterialModule, UsersRoutingModule, RegisterModule, SharedModule],
})
export class UsersModule {}
