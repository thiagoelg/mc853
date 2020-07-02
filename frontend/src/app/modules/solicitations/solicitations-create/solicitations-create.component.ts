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
  form$: Observable<FormFull>;
  formId$ = new BehaviorSubject<number>(null);

  constructor(private solicitationsService: SolicitationsService) { }

  ngOnInit(): void {
    this.form$ = this.formId$.pipe(concatMap(id => id > 0 ? this.solicitationsService.fetchFullForm(id) : of(undefined)));
  }

  selectForm(form: Form) {
    this.formId$.next(form?.id ?? null);
    console.log(`Form ${form?.name} Selected`);
  }
}
