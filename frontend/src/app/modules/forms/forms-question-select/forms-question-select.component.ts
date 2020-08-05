import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { concat, Observable, of } from 'rxjs';
import { debounceTime, delay, map, withLatestFrom } from 'rxjs/operators';
import { Question } from 'src/app/models/question';
import { FormsService } from '../forms.service';

export interface QuestionSelectDialogData {
  question: Question;
}

@Component({
  selector: 'app-forms-question-select',
  templateUrl: './forms-question-select.component.html',
  styleUrls: ['./forms-question-select.component.css'],
})
export class FormsQuestionSelectComponent implements OnInit {
  @Output() questionSelect = new EventEmitter<Question>();

  basicTypes = [
    { value: null, viewValue: 'Todas' },
    { value: 'text', viewValue: 'Texto' },
    { value: 'number', viewValue: 'Numero' },
    { value: 'date', viewValue: 'Data' },
    { value: 'file', viewValue: 'Arquivo' },
  ];

  questionForm: FormGroup;
  questions$: Observable<Question[]>;
  filteredQuestions$: Observable<OptionItem[]>;

  constructor(
    public dialogRef: MatDialogRef<FormsQuestionSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionSelectDialogData,
    private formsService: FormsService,
    private fb: FormBuilder
  ) {
    this.questions$ = this.formsService.fetchQuestions({ status: true });

    this.questionForm = this.fb.group({
      searchText: [''],
      typeFilter: [null],
      questions: [null, [Validators.required]],
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.filteredQuestions$ = concat(
      of(undefined).pipe(delay(800)), // hmm
      this.questionForm.valueChanges
    ).pipe(
      withLatestFrom(this.questions$),
      debounceTime(200),
      // tap({ next: console.log }),
      map(([formValues, allQuestions]: [FormType, Question[]]) =>
        this.filterQuestions([formValues, allQuestions])
      ),
      map(([formValues, filteredQuestions]: [FormType, OptionItem[]]) => {
        if (!formValues?.questions || formValues?.questions.length === 0) {
          return filteredQuestions;
        }

        return [
          ...formValues?.questions,
          ...filteredQuestions.filter(
            (item) => !formValues?.questions.some((i) => i.id === item.id)
          ),
        ];
      })
    );
  }

  filterQuestions([formValues, allQuestions]: [FormType, Question[]]): [FormType, OptionItem[]] {
    return [
      formValues,
      allQuestions.map((item) => {
        const noSearch = !formValues?.searchText || formValues?.searchText.length === 0;
        const passesFilter =
          !formValues?.typeFilter || formValues?.typeFilter === item.response_type.basic_type;

        if (!passesFilter) {
          return { item, hide: true };
        } else if (noSearch) {
          return item;
        }

        const wordsToSearch = formValues?.searchText.toLocaleLowerCase().split(/[\s,]+/);
        const text = item?.text.toLocaleLowerCase();

        return {
          ...item,
          hide: !wordsToSearch.every((word) => text.includes(word)),
        };
      }) as OptionItem[],
    ];
  }
}

export interface OptionItem extends Question {
  hide?: boolean;
}

interface FormType {
  searchText: string;
  typeFilter: string;
  questions: Question[];
}
