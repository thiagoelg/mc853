import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { SharedModule } from './../../shared/shared.module';
import { SolicitationsCreateComponent } from './solicitations-create/solicitations-create.component';
import { SolicitationsDisplayComponent } from './solicitations-display/solicitations-display.component';
import { SolicitationsFormFillComponent } from './solicitations-form-fill/solicitations-form-fill.component';
import { SolicitationsFormPageComponent } from './solicitations-form-page/solicitations-form-page.component';
import { SolicitationsListComponent } from './solicitations-list/solicitations-list.component';
import { SolicitationsRoutingModule } from './solicitations-routing.module';
import { SolicitationsComponent } from './solicitations.component';
import { SecurityModule } from 'src/app/security/security.module';

@NgModule({
  declarations: [
    SolicitationsComponent,
    SolicitationsCreateComponent,
    SolicitationsFormFillComponent,
    SolicitationsListComponent,
    SolicitationsDisplayComponent,
    SolicitationsFormPageComponent,
  ],
  imports: [
    CommonModule,
    SolicitationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    SecurityModule,
    SharedModule
  ],
})
export class SolicitationsModule { }
