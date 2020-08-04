import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Form } from './../../models/form';
import { FormsService } from './forms.service';
import { TableAction, TableEmittedAction } from 'src/app/shared/data-table/data-table.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  columnNames: any;
  forms: Form[];
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

  constructor(private formsService: FormsService) {
    this.columnNames = { name: 'Nome', is_template: 'É padrão?', created_at: 'Criado em:', updated_at: 'Atualizado em:' };
    this.formsService.fetchForms().subscribe(forms => this.forms = forms);
  }

  ngOnInit() { }

  onAction(event: TableEmittedAction) {
    const { action, element } = event;
    if (action === 'enable') {
      this.formsService.toggleStatusForm(element.id, true).subscribe(() => {
        this.forms.find(form => element.id === form.id).status = true;
      });
    } else {
      this.formsService.toggleStatusForm(element.id, false).subscribe(() => {
        this.forms.find(form => element.id === form.id).status = false;
      });
    }
  }
}
