import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/models/question';
import { FormsService } from './../forms.service';

@Component({
  selector: 'app-forms-question',
  templateUrl: './forms-question.component.html',
  styleUrls: ['./forms-question.component.css'],
})
export class FormsQuestionComponent implements OnInit {
  questions$: Observable<Question[]>;
  columnNames: any;

  constructor(private formsService: FormsService) {
    this.columnNames = {
      id: 'Número',
      text: 'Pergunta',
      response_type_name: 'Tipo de resposta',
      response_type_basic_type: 'Categoria da resposta',
      created_at: 'Criado em:',
      updated_at: 'Atualizado em:'
    };
    this.questions$ = this.formsService.fetchQuestions().pipe(
      map(questions => questions.map(q => {
        return {
          ...q,
          response_type_name: q.response_type.name,
          response_type_basic_type: q.response_type.basic_type
        };
      }))
    );
  }

  ngOnInit(): void { }
}
