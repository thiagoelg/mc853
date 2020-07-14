import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormData } from 'src/app/models/form';
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

  responseTypes$: Observable<ResponseType[]>;
  questions$: Observable<Question[]>;
  types$: Observable<{ groupName: string; types: ResponseType[] }[]>;

  form: FormGroup;
  formQuestions: FormQuestion[] = [];

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.buildForm();
    this.setTypeObservables();
  }

  ngOnInit(): void { }

  get formArr(): FormArray {
    return this.form?.controls.form_questions as FormArray;
  }

  drop(event: CdkDragDrop<string[]>) {
    const formArrayValue = [...(this.formArr.value as any[])];

    moveItemInArray(formArrayValue, event.previousIndex, event.currentIndex);

    this.formArr.patchValue(formArrayValue);
  }


  removeControl(index: number) {
    this.formArr.removeAt(index);
  }

  addControls(values: Question[]) {
    const controls = this.formArr.controls ?? [];

    const formArray = new FormArray([
      ...controls,
      ...(values ?? []).map((question: Question) => {
        return new FormGroup({
          question: new FormControl(question),
          required: new FormControl(false)
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

    this.formsService.createForm(this.formattedForm).subscribe({
      next: (data) => {
        console.log({ data });
        this.router.navigate(['/forms', data.id]);
      },
      error: (error) => {
        console.log({ error });
      }
    });
  }

  get formattedForm(): FormData {
    const fv: {
      is_template: boolean,
      name: string,
      form_questions: { question: Question, required: boolean }[]
    } = this.form.value;

    return {
      ...fv,
      form_questions: fv.form_questions.map((item, i) => {
        return {
          question_id: item.question.id,
          order: i,
          required: item.required
        };
      })
    } as FormData;
  }

  setTypeObservables() {
    this.responseTypes$ = this.formsService.fetchResponseTypes();

    this.types$ = this.formsService.fetchResponseTypes().pipe(
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
