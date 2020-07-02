import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseType } from 'src/app/models/responseType';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-forms-response-type',
  templateUrl: './forms-response-type.component.html',
  styleUrls: ['./forms-response-type.component.css'],
})
export class FormsResponseTypeComponent implements OnInit {
  responseTypes$: Observable<ResponseType[]>;

  constructor(private formsService: FormsService) {
    this.responseTypes$ = this.formsService.fetchResponseTypes();
  }
  ngOnInit(): void {}
}
