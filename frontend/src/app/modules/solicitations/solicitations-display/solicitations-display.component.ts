import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Solicitation } from 'src/app/models/solicitation';
import { SolicitationsService } from '../solicitations.service';

@Component({
  selector: 'app-solicitations-display',
  templateUrl: './solicitations-display.component.html',
  styleUrls: ['./solicitations-display.component.css'],
})
export class SolicitationsDisplayComponent implements OnInit {
  solicitationId: number;
  solicitation$: Observable<Solicitation>;

  constructor(private solicitationsService: SolicitationsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.solicitationId = Number(this.route.snapshot.paramMap.get('solicitation_id'));
    this.solicitation$ = this.solicitationsService.fetchSolicitation(this.solicitationId);
  }

  onAssignToUser() {
    this.solicitationsService.assignToUser(this.solicitationId).subscribe({
      next: (data) => {
        console.log({ data });
      },
      error: (error) => {
        console.log({ error });
      },
    });
  }
}
