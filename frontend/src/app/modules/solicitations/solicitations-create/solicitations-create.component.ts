import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Form, FormFull } from 'src/app/models/form';
import { SolicitationsService } from './../solicitations.service';

@Component({
  templateUrl: './solicitations-create.component.html',
  styleUrls: ['./solicitations-create.component.css'],
})
export class SolicitationsCreateComponent implements OnInit {
  forms$: Observable<Form[]>;
  formId$ = new BehaviorSubject<number>(null);
  form$: Observable<FormFull>;

  constructor(private solicitationsService: SolicitationsService) {
    this.forms$ = this.solicitationsService.fetchForms();
  }

  ngOnInit(): void {
    this.form$ = this.formId$.pipe(concatMap(id => id > 0 ? this.solicitationsService.fetchFullForm(id) : of(undefined)));
  }

  selectForm(id: number) {
    this.formId$.next(null);
    this.formId$.next(id);
  }

  onSubmit(formValue: any) {
    this.solicitationsService.createSolicitation(formValue).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
