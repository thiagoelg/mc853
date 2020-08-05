import { Component, OnInit } from '@angular/core';
import { SolicitationsService } from './solicitations.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Solicitation } from 'src/app/models/solicitation';

@Component({
  selector: 'app-solicitations',
  templateUrl: './solicitations.component.html',
  styleUrls: ['./solicitations.component.css'],
})
export class SolicitationsComponent implements OnInit {
  unassignedSolicitations$: Observable<Solicitation[]> = new BehaviorSubject([]);
  solicitationsManagedByUser$: Observable<Solicitation[]> = new BehaviorSubject([]);
  solicitationsSubmittedByUser$: Observable<Solicitation[]> = new BehaviorSubject([]);

  constructor(private solicitationsService: SolicitationsService) {}

  ngOnInit() {}
}
