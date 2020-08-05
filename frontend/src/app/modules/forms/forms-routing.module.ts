import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsCreateComponent } from './forms-create/forms-create.component';
import { FormsQuestionCreateComponent } from './forms-question-create/forms-question-create.component';
import { FormsQuestionComponent } from './forms-question/forms-question.component';
import { FormsResponseTypeComponent } from './forms-response-type/forms-response-type.component';
import { FormsComponent } from './forms.component';
import { FormsResponseTypeCreateComponent } from './forms-response-type-create/forms-response-type-create.component';

const routes: Routes = [
  { path: 'list', component: FormsComponent },
  { path: 'new', component: FormsCreateComponent },
  {
    path: 'questions',
    children: [
      { path: 'list', component: FormsQuestionComponent },
      { path: 'new', component: FormsQuestionCreateComponent },
    ]
  },
  {
    path: 'response-types',
    children: [
      { path: 'list', component: FormsResponseTypeComponent },
      { path: 'new', component: FormsResponseTypeCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule { }
