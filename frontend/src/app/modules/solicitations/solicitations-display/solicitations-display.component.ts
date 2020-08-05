import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, BehaviorSubject, merge } from 'rxjs';
import { Solicitation } from 'src/app/models/solicitation';
import { SolicitationsService } from '../solicitations.service';
import { AuthService } from 'src/app/security/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-solicitations-display',
  templateUrl: './solicitations-display.component.html',
  styleUrls: ['./solicitations-display.component.css'],
})
export class SolicitationsDisplayComponent implements OnInit {
  solicitationId: number;

  canAssignToUser$: Observable<boolean>;

  solicitation$: Observable<Solicitation>;

  solicitationAssignedToUser$: Subject<Solicitation> = new Subject();

  constructor(
    private solicitationsService: SolicitationsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.solicitationId = Number(this.route.snapshot.paramMap.get('solicitation_id'));

    this.solicitation$ = merge(
      this.solicitationsService.fetchSolicitation(this.solicitationId),
      this.solicitationAssignedToUser$
    );

    this.canAssignToUser$ = this.solicitation$.pipe(
      map((solicitation) => solicitation.managed_by_user_id !== this.authService.user.id)
    );
  }

  onAssignToUser() {
    this.solicitationsService.assignToUser(this.solicitationId).subscribe({
      next: (data) => {
        this.solicitationAssignedToUser$.next(data);
        console.log({ data });
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
}
