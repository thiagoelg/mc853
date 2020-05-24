import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from './../../models/form';
import { FormsService } from './forms.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  forms$: Observable<Form[]>;

  constructor(private formsService: FormsService) {
    this.forms$ = this.formsService.fetchForms();
  }

  ngOnInit(): void {}
}
