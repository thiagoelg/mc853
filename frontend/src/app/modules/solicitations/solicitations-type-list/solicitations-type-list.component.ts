import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from './../../../models/form';
import { SolicitationsService } from './../solicitations.service';

@Component({
  selector: 'app-solicitations-type-list',
  templateUrl: './solicitations-type-list.component.html',
  styleUrls: ['./solicitations-type-list.component.css'],
})
export class SolicitationsTypeListComponent implements OnInit {
  @Output() selected = new EventEmitter<Form>();
  forms$: Observable<Form[]>;

  constructor(private solicitationsService: SolicitationsService) {
    this.forms$ = solicitationsService.fetchForms();
  }

  ngOnInit(): void {}
}
