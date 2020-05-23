import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';
import { FormsFormQuestionComponent } from './forms-form-question/forms-form-question.component';
import { FormsQuestionComponent } from './forms-question/forms-question.component';
import { FormsResponseTypeComponent } from './forms-response-type/forms-response-type.component';


@NgModule({
  declarations: [FormsComponent, FormsFormQuestionComponent, FormsQuestionComponent, FormsResponseTypeComponent],
  imports: [
    CommonModule,
    FormsRoutingModule
  ]
})
export class FormsModule { }
