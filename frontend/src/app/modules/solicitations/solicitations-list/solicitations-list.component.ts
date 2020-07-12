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

  constructor(private solicitationsService: SolicitationsService) {
    this.solicitations$ = this.solicitationsService.fetchSolicitations();
  }

  ngOnInit(): void {
  }

}
