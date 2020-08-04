import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitationsCreateComponent } from './solicitations-create/solicitations-create.component';
import { SolicitationsDisplayComponent } from './solicitations-display/solicitations-display.component';
import { SolicitationsFormPageComponent } from './solicitations-form-page/solicitations-form-page.component';
import { SolicitationsComponent } from './solicitations.component';


const routes: Routes = [
  {
    path: 'list',
    component: SolicitationsComponent
  },
  {
    path: 'create',
    children: [
      {
        path: '',
        component: SolicitationsCreateComponent,
      },
      {
        path: ':form_id',
        component: SolicitationsFormPageComponent
      }
    ]
  },
  {
    path: ':solicitation_id',
    component: SolicitationsDisplayComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitationsRoutingModule { }
