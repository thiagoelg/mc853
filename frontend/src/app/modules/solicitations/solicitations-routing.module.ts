import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitationsCreateComponent } from './solicitations-create/solicitations-create.component';
import { SolicitationsComponent } from './solicitations.component';


const routes: Routes = [
  {
    path: '',
    component: SolicitationsComponent
  },
  {
    path: 'create',
    component: SolicitationsCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class SolicitationsRoutingModule { }
