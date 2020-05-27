import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Form, FormFull } from 'src/app/models/form';
import { SolicitationsService } from './../solicitations.service';

@Component({
  templateUrl: './solicitations-create.component.html',
  styleUrls: ['./solicitations-create.component.css'],
})
export class SolicitationsCreateComponent implements OnInit {
  form$: Observable<FormFull>;

  constructor(private solicitationsService: SolicitationsService) {}

  ngOnInit(): void {
    this.form$ = this.solicitationsService.fetchFullForm(1);
  }

  selectForm(form: Form) {
    console.log('Form Selected');
  }
}
