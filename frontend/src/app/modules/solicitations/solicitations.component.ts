import { Component, OnInit } from '@angular/core';
import { SolicitationsService } from './solicitations.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Solicitation } from 'src/app/models/solicitation';
import { AuthService } from 'src/app/security/auth.service';

@Component({
  selector: 'app-solicitations',
  templateUrl: './solicitations.component.html',
  styleUrls: ['./solicitations.component.css'],
})
export class SolicitationsComponent implements OnInit {
  areUnassignedVisible: boolean = true;
  unassignedSolicitations$: Observable<Solicitation[]> = new BehaviorSubject([]);

  areManagedVisible: boolean = true;
  solicitationsManagedByUser$: Observable<Solicitation[]> = new BehaviorSubject([]);

  areSubmittedVisible: boolean = true;
  solicitationsSubmittedByUser$: Observable<Solicitation[]> = new BehaviorSubject([]);

  constructor(
    private solicitationsService: SolicitationsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.areUnassignedVisible = this.authService.hasEitherPermission([
      'manage_solicitations',
      'answer_solicitation',
    ]);

    this.areManagedVisible = this.authService.hasEitherPermission([
      'manage_solicitations',
      'answer_solicitation',
    ]);

    this.areSubmittedVisible = this.authService.hasEitherPermission([
      'manage_solicitations',
      'answer_solicitation',
      'create_solicitation',
    ]);
  }
}
