import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsCreateComponent } from './forms-create/forms-create.component';
import { FormsDisplayComponent } from './forms-display/forms-display.component';
import { FormsQuestionComponent } from './forms-question/forms-question.component';
import { FormsResponseTypeComponent } from './forms-response-type/forms-response-type.component';
import { FormsComponent } from './forms.component';

const routes: Routes = [
  { path: '', component: FormsComponent },
  { path: 'create', component: FormsCreateComponent },
  { path: 'questions', component: FormsQuestionComponent },
  { path: 'response-types', component: FormsResponseTypeComponent },
  { path: ':form_id', component: FormsDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule { }
