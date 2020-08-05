import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Question } from 'src/app/models/question';
import { ResponseType } from 'src/app/models/responseType';
import { FormsService } from '../forms.service';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-forms-question-create',
  templateUrl: './forms-question-create.component.html',
  styleUrls: ['./forms-question-create.component.css'],
})
export class FormsQuestionCreateComponent implements OnInit {
  @Output() created = new EventEmitter<Question>();
  form: FormGroup;

  responseTypes$: Observable<ResponseType[]>;
  types$: Observable<{ groupName: string; types: ResponseType[] }[]>;
  currentPath: string;

  constructor(
    private fb: FormBuilder,
    private formService: FormsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.buildForm();
    this.setTypeObservables();
    this.route.parent.url.subscribe(url => {
      this.currentPath = url[0].path;
    });
  }

  ngOnInit(): void { }

  buildForm() {
    this.form = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(3)]],
      response_type_id: [undefined, [Validators.required]],
    });
  }

  onSubmit() {
    const form = this.form.value;
    console.log({ form });

    this.formService.createQuestion(form).subscribe({
      next: (data) => {
        console.log({ data });
        this.created.emit(data);
        this.router.navigate(['/forms/questions/list']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  setTypeObservables() {
    this.responseTypes$ = this.formService.fetchResponseTypes();

    this.types$ = this.formService.fetchResponseTypes({ status: true }).pipe(
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
