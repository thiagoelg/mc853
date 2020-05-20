import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SolicitationsCreateComponent } from './solicitations-create/solicitations-create.component';
import { SolicitationsRoutingModule } from './solicitations-routing.module';
import { SolicitationsComponent } from './solicitations.component';



@NgModule({
  declarations: [SolicitationsComponent, SolicitationsCreateComponent],
  imports: [
    CommonModule,
    SolicitationsRoutingModule
  ]
})
export class SolicitationsModule { }
