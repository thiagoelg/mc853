import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormQuestion } from 'src/app/models/formQuestion';
import { Question } from 'src/app/models/question';
import { ResponseType } from 'src/app/models/responseType';
import { FormsService } from '../forms.service';
import { FormsQuestionSelectComponent } from './../forms-question-select/forms-question-select.component';

@Component({
  selector: 'app-forms-create',
  templateUrl: './forms-create.component.html',
  styleUrls: ['./forms-create.component.css'],
})
export class FormsCreateComponent implements OnInit {
  isMobile = navigator.maxTouchPoints > 0;

  form: FormGroup;

  responseTypes$: Observable<ResponseType[]>;

  questions$: Observable<Question[]>;

  types$: Observable<{ groupName: string; types: ResponseType[] }[]>;

  formQuestions: FormQuestion[] = [];

  constructor(
    private fb: FormBuilder,
    private formService: FormsService,
    public dialog: MatDialog
  ) {
    this.buildForm();
    this.setTypeObservables();
  }

  // Don't do this =D
  getFormArrayControls = () => (this.form?.controls.form_questions as FormArray)?.controls;

  drop(event: CdkDragDrop<string[]>) {
    const formArrayValue = [...((this.form.controls.form_questions as FormArray).value as any[])];

    moveItemInArray(formArrayValue, event.previousIndex, event.currentIndex);

    (this.form.controls.form_questions as FormArray).patchValue(formArrayValue);
  }

  ngOnInit(): void {}

  removeControl(index: number) {
    (this.form.controls.form_questions as FormArray).removeAt(index);
  }

  addControls(values: Question[]) {
    const controls = (this.form.controls.form_questions as FormArray).controls ?? [];

    const formArray = new FormArray([
      ...controls,
      ...(values ?? []).map((question: Question) => {
        return new FormControl({
          question_id: [question.id, [Validators.required]],
          required: false,
          _question: question,
        });
      }),
    ]);

    return this.form.setControl('form_questions', formArray);
  }

  buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      is_template: [false, [Validators.required]],
      form_questions: this.fb.array([]),
    });

    // this.form.valueChanges.subscribe({ next: (values) => console.log({ values }) });
  }

  onSubmit() {
    console.log('onSubmit() called');
    console.log({ form: this.form.value });

    // this.formService.createQuestion(this.form.value).subscribe({
    //   next: () => this.formed(),
    // });
  }

  setTypeObservables() {
    this.responseTypes$ = this.formService.fetchResponseTypes();

    this.types$ = this.formService.fetchResponseTypes().pipe(
      tap((value) => console.log(value)),
      map((items) => {
        return [
          { groupName: 'Texto', types: items.filter((item) => item.basic_type === 'text') ?? [] },
          {
            groupName: 'Número',
            types: items.filter((item) => item.basic_type === 'number') ?? [],
          },
          { groupName: 'Data', types: items.filter((item) => item.basic_type === 'date') ?? [] },
          { groupName: 'Arquivo', types: items.filter((item) => item.basic_type === 'file') ?? [] },
        ];
      }),
      tap((value) => console.log(value))
    );
  }

  openAddQuestionDialog(): void {
    const dialogRef = this.dialog.open(FormsQuestionSelectComponent, {
      // width: '100%',
      maxWidth: 'calc(100vw -68px)',
    } as MatDialogConfig);

    dialogRef.afterClosed().subscribe((result: Question[]) => {
      // console.log('The dialog was closed');
      this.addControls(result);
    });
  }
}
