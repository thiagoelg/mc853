import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { SolicitationsCreateComponent } from './solicitations-create/solicitations-create.component';
import { SolicitationsFormFillComponent } from './solicitations-form-fill/solicitations-form-fill.component';
import { SolicitationsRoutingModule } from './solicitations-routing.module';
import { SolicitationsComponent } from './solicitations.component';
import { SolicitationsTypeListComponent } from './solicitations-type-list/solicitations-type-list.component';
import { SolicitationsListComponent } from './solicitations-list/solicitations-list.component';
import { SolicitationsDisplayComponent } from './solicitations-display/solicitations-display.component';
import { SolicitationsFormPageComponent } from './solicitations-form-page/solicitations-form-page.component';

@NgModule({
  declarations: [
    SolicitationsComponent,
    SolicitationsCreateComponent,
    SolicitationsFormFillComponent,
    SolicitationsTypeListComponent,
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
  ],
})
export class SolicitationsModule {}
