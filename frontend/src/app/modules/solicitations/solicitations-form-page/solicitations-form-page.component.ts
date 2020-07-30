import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormFull } from 'src/app/models/form';
import { SolicitationsService } from '../solicitations.service';

@Component({
  selector: 'app-solicitations-form-page',
  templateUrl: './solicitations-form-page.component.html',
  styleUrls: ['./solicitations-form-page.component.css']
})
export class SolicitationsFormPageComponent implements OnInit {

  form$: Observable<FormFull>;

  constructor(private solicitationsService: SolicitationsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('form_id'));
    this.form$ = this.solicitationsService.fetchFullForm(id);
  }


  onSubmit(formValue: any) {
    this.solicitationsService.createSolicitation(formValue).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['solicitations', data.id]);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
