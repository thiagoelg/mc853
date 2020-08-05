import { Component, OnInit } from '@angular/core';
import { SolicitationsService } from './solicitations.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Solicitation } from 'src/app/models/solicitation';
import { AuthService } from 'src/app/security/auth.service';
import { PermissionGuard } from 'src/app/security/permission.guard';

@Component({
  selector: 'app-solicitations',
  templateUrl: './solicitations.component.html',
  styleUrls: ['./solicitations.component.css'],
})
export class SolicitationsComponent implements OnInit {
  canCreateSolicitation: boolean = true;

  areUnassignedVisible: boolean = true;
  unassignedSolicitations$: Observable<Solicitation[]> = new BehaviorSubject([]);

  areManagedVisible: boolean = true;
  solicitationsManagedByUser$: Observable<Solicitation[]> = new BehaviorSubject([]);

  areSubmittedVisible: boolean = true;
  solicitationsSubmittedByUser$: Observable<Solicitation[]> = new BehaviorSubject([]);

  constructor(private solicitationsService: SolicitationsService, private authService: AuthService) {}

  ngOnInit() {
    this.canCreateSolicitation = this.authService.hasEitherPermission([
      PermissionGuard.PERMISSIONS.CREATE_SOLICITATION,
    ]);

    this.areUnassignedVisible = this.authService.hasEitherPermission([
      PermissionGuard.PERMISSIONS.MANAGE_SOLICITATIONS,
    ]);

    this.unassignedSolicitations$ = this.solicitationsService.fetchUnassignedSolicitations();

    this.areManagedVisible = this.authService.hasEitherPermission([PermissionGuard.PERMISSIONS.ANSWER_SOLICITATION]);

    this.solicitationsManagedByUser$ = this.solicitationsService.fetchSolicitationsManagedByUser();

    this.areSubmittedVisible = this.authService.hasEitherPermission([PermissionGuard.PERMISSIONS.CREATE_SOLICITATION]);

    this.solicitationsSubmittedByUser$ = this.solicitationsService.fetchSolicitationsSubmittedByUser();
  }
}
