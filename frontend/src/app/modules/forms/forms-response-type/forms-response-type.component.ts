import { Component } from '@angular/core';
import { ResponseType } from 'src/app/models/responseType';
import { FormsService } from '../forms.service';
import { TableAction, TableEmittedAction } from 'src/app/shared/data-table/data-table.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms-response-type',
  templateUrl: './forms-response-type.component.html',
  styleUrls: ['./forms-response-type.component.css'],
})
export class FormsResponseTypeComponent {
  responseTypes: ResponseType[];
  columnNames = { name: 'Nome', basic_type: 'Tipo', min: 'Mínimo', max: 'Máximo' };
  actions: TableAction[] = [
    {
      name: 'enable',
      label: 'Habilitar',
      condition: (item) => !item.status
    },
    {
      name: 'disable',
      label: 'Desabilitar',
      condition: (item) => item.status
    }
  ];

  constructor(private formsService: FormsService, private router: Router) {
    this.formsService.fetchResponseTypes().subscribe((types) => {
      this.responseTypes = types;
    });
  }

  onAction(event: TableEmittedAction) {
    const { action, element } = event;
    if (action === 'enable') {
      this.formsService.toggleStatusResponseType(element.id, true).subscribe(() => {
        this.responseTypes.find(type => element.id === type.id).status = true;
      });
    } else {
      this.formsService.toggleStatusResponseType(element.id, false).subscribe(() => {
        this.responseTypes.find(type => element.id === type.id).status = false;
      });
    }
  }
}
