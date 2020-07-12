import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Solicitation } from 'src/app/models/solicitation';
import { SolicitationsService } from '../solicitations.service';

@Component({
  selector: 'app-solicitations-display',
  templateUrl: './solicitations-display.component.html',
  styleUrls: ['./solicitations-display.component.css']
})
export class SolicitationsDisplayComponent implements OnInit {
  solicitation$: Observable<Solicitation>;

  constructor(private solicitationsService: SolicitationsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('solicitation_id'));
    this.solicitation$ = this.solicitationsService.fetchSolicitation(id);
  }

}
