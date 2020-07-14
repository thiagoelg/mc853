import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
      submitted_by_user_id: 'Submetido por:',
      managed_by_user_id: 'Administrado por:',
      created_at: 'Criado em:',
      updated_at: 'Atualizado em:',
      solved_at: 'Solucionado em:'
    };
    this.solicitations$ = this.solicitationsService.fetchSolicitations();
  }

  ngOnInit(): void {
  }

}
