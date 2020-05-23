import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsQuestionComponent } from './forms-question/forms-question.component';
import { FormsResponseTypeComponent } from './forms-response-type/forms-response-type.component';
import { FormsComponent } from './forms.component';

const routes: Routes = [
  { path: '', component: FormsComponent },
  { path: 'questions', component: FormsQuestionComponent },
  { path: 'response-types', component: FormsResponseTypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
