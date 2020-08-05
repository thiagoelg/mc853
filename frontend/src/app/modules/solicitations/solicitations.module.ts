import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { SharedModule } from './../../shared/shared.module';
import { SolicitationsCreateComponent } from './solicitations-create/solicitations-create.component';
import { SolicitationsDisplayComponent } from './solicitations-display/solicitations-display.component';
import { SolicitationsFormFillComponent } from './solicitations-form-fill/solicitations-form-fill.component';
import { SolicitationsListComponent } from './solicitations-list/solicitations-list.component';
import { SolicitationsRoutingModule } from './solicitations-routing.module';
import { SolicitationsComponent } from './solicitations.component';

@NgModule({
  declarations: [
    SolicitationsComponent,
    SolicitationsCreateComponent,
    SolicitationsFormFillComponent,
    SolicitationsListComponent,
    SolicitationsDisplayComponent
  ],
  imports: [
    CommonModule,
    SolicitationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    SharedModule
  ],
})
export class SolicitationsModule { }
