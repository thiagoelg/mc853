import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseType } from 'src/app/models/responseType';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-forms-question-create',
  templateUrl: './forms-question-create.component.html',
  styleUrls: ['./forms-question-create.component.css'],
})
export class FormsQuestionCreateComponent implements OnInit {
  form: FormGroup;

  responseTypes$: Observable<ResponseType[]>;

  types$: Observable<{ groupName: string; types: ResponseType[] }[]>;

  constructor(private fb: FormBuilder, private formService: FormsService) {
    this.buildForm();
    this.setTypeObservables();
  }

  ngOnInit(): void {}

  buildForm() {
    this.form = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
      response_type_id: [undefined, [Validators.required]],
    });
  }

  onSubmit() {
    console.log('onSubmit() called');
    console.log({ form: this.form.value });
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
}
