import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitation } from 'src/app/models/solicitation';
import { SolicitationsService } from './../solicitations.service';

@Component({
  selector: 'app-solicitations-list',
  templateUrl: './solicitations-list.component.html',
  styleUrls: ['./solicitations-list.component.css']
})
export class SolicitationsListComponent implements OnInit {

  solicitations$: Observable<Solicitation[]>;
  columnNames: any;

  constructor(private solicitationsService: SolicitationsService) {
    this.columnNames = {
      id: 'Número',
      submitted_by_user_name: 'Submetido por:',
      form_name: 'Formulário da solicitação:',
      managed_by_user_name: 'Administrado por:',
      solution_form_name: 'Formulário da resposta:',
      solved_at: 'Solucionado em:',
      evaluation_form_name: 'Formulário da avaliação:',
      created_at: 'Criado em:',
      updated_at: 'Atualizado em:',
    };
    this.solicitations$ = this.solicitationsService.fetchSolicitations().pipe(
      map(solicitations => solicitations.map(s => {
        return {
          ...s,
          submitted_by_user_name: s.submitted_by_user?.name,
          managed_by_user_name: s.managed_by_user?.name,
          form_name: s.form?.name,
          solution_form_name: s.solution_form?.name,
          evaluation_form_name: s.evaluation_form?.name
        };
      }))
    );
  }

  ngOnInit(): void {
  }

}
