import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Form, FormFull } from 'src/app/models/form';
import { SolicitationsService } from './../solicitations.service';
import { Router } from '@angular/router';
import { FormsService } from '../../forms/forms.service';

@Component({
  templateUrl: './solicitations-create.component.html',
  styleUrls: ['./solicitations-create.component.css'],
})
export class SolicitationsCreateComponent implements OnInit {
  forms$: Observable<Form[]>;
  formId$ = new BehaviorSubject<number>(null);
  form$: Observable<FormFull>;

  constructor(
    private solicitationsService: SolicitationsService,
    private formsService: FormsService,
    private router: Router
  ) {
    this.forms$ = this.formsService.fetchForms({ status: true });
  }

  ngOnInit(): void {
    this.form$ = this.formId$.pipe(
      concatMap((id) => (id > 0 ? this.solicitationsService.fetchFullForm(id) : of(undefined)))
    );
  }

  selectForm(id: number) {
    this.formId$.next(null);
    this.formId$.next(id);
  }

  onSubmit(formValue: any) {
    this.solicitationsService.createSolicitation(formValue).subscribe({
      next: (data) => {
        this.router.navigate(['/solicitations', data.id]);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onCancelFormFill() {
    this.formId$.next(null);
  }
}
