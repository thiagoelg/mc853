import { Component } from '@angular/core';
import { Question } from 'src/app/models/question';
import { FormsService } from './../forms.service';
import { TableAction, TableEmittedAction } from 'src/app/shared/data-table/data-table.component';

@Component({
  selector: 'app-forms-question',
  templateUrl: './forms-question.component.html',
  styleUrls: ['./forms-question.component.css'],
})
export class FormsQuestionComponent {
  questions: Question[];
  columnNames: any;
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
    this.columnNames = {
      id: 'Número',
      text: 'Pergunta',
      response_type_name: 'Tipo de resposta',
      response_type_basic_type: 'Categoria da resposta'
    };
    this.formsService.fetchQuestions().subscribe((questions) => {
      this.questions = questions.map(q => {
        return {
          ...q,
          response_type_name: q.response_type.name,
          response_type_basic_type: q.response_type.basic_type
        };
      });
    });
  }

  onAction(event: TableEmittedAction) {
    const { action, element } = event;
    if (action === 'enable') {
      this.formsService.toggleStatusQuestion(element.id, true).subscribe(() => {
        this.questions.find(type => element.id === type.id).status = true;
      });
    } else {
      this.formsService.toggleStatusQuestion(element.id, false).subscribe(() => {
        this.questions.find(type => element.id === type.id).status = false;
      });
    }
  }
}
