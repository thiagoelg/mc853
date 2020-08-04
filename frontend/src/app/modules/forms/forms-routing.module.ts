import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsCreateComponent } from './forms-create/forms-create.component';
import { FormsDisplayComponent } from './forms-display/forms-display.component';
import { FormsQuestionCreateComponent } from './forms-question-create/forms-question-create.component';
import { FormsQuestionComponent } from './forms-question/forms-question.component';
import { FormsResponseTypeComponent } from './forms-response-type/forms-response-type.component';
import { FormsComponent } from './forms.component';

const routes: Routes = [
  { path: 'list', component: FormsComponent },
  { path: 'create', component: FormsCreateComponent },
  { path: 'response-types', component: FormsResponseTypeComponent },
  {
    path: 'questions',
    children: [
      { path: 'list', component: FormsQuestionComponent },
      { path: 'create', component: FormsQuestionCreateComponent },
    ]
  },
  { path: ':form_id', component: FormsDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule { }
