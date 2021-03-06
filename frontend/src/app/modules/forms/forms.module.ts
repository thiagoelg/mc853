import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsCreateComponent } from './forms-create/forms-create.component';
import { FormsQuestionCreateComponent } from './forms-question-create/forms-question-create.component';
import { FormsQuestionSelectComponent } from './forms-question-select/forms-question-select.component';
import { FormsQuestionComponent } from './forms-question/forms-question.component';
import { FormsResponseTypeCreateComponent } from './forms-response-type-create/forms-response-type-create.component';
import { FormsResponseTypeComponent } from './forms-response-type/forms-response-type.component';
import { FormsRoutingModule } from './forms-routing.module';
import { FormsComponent } from './forms.component';

@NgModule({
  declarations: [
    FormsComponent,
    FormsQuestionComponent,
    FormsResponseTypeComponent,
    FormsResponseTypeCreateComponent,
    FormsQuestionCreateComponent,
    FormsCreateComponent,
    FormsQuestionSelectComponent
  ],
  imports: [CommonModule, AppMaterialModule, FormsRoutingModule, ReactiveFormsModule, SharedModule],
})
export class FormsModule { }
