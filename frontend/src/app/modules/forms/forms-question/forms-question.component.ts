import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/question';
import { FormsService } from './../forms.service';

@Component({
  selector: 'app-forms-question',
  templateUrl: './forms-question.component.html',
  styleUrls: ['./forms-question.component.css'],
})
export class FormsQuestionComponent implements OnInit {
  questions$: Observable<Question[]>;

  constructor(private formsService: FormsService) {
    this.questions$ = this.formsService.fetchQuestions();
  }

  ngOnInit(): void {}
}
