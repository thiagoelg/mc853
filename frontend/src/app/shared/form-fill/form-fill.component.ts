import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormFull } from 'src/app/models/form';
import { FormQuestion } from 'src/app/models/formQuestion';

@Component({
  selector: 'app-form-fill',
  templateUrl: './form-fill.component.html',
  styleUrls: ['./form-fill.component.css']
})
export class FormFillComponent implements OnInit {


  @Input() formType: FormFull;
  @Output() formData = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  @Input() displayOnly = false;
  @Input() submitText = 'Enviar requisição';

  isTouch = window.matchMedia('(pointer: coarse)').matches;

  form: FormGroup;
  answers: FormArray;

  sortedQuestions: FormQuestion[];
  elementTypes: string[];
  hints: string[];

  formCreated = false;

  constructor() {
  }

  ngOnInit(): void {
    this.sortedQuestions = this.formType?.form_questions?.sort((a, b) => a.order - b.order);
    this.buildForm();
    this.setHints();
    this.setElementTypes();

    this.formCreated = true;

    if (this.displayOnly) {
      this.form.disable();
    }
  }

  private buildForm() {
    this.form = new FormGroup({
      form_id: new FormControl(this.formType.id, Validators.required),
      answers: new FormArray(this.sortedQuestions.map(fq => new FormGroup({
        form_question_id: new FormControl(fq.id),
        answer: new FormControl(undefined, this.toValidators(fq))
      })))
    });

    this.answers = this.form.get('answers') as FormArray;
  }

  private toValidators(formQuestion: FormQuestion): ValidatorFn[] {
    const validators = [];
    const responseType = formQuestion?.question?.response_type;

    if (formQuestion?.required) {
      validators.push(Validators.required);
    }

    if (responseType?.basic_type === 'text') {
      if (responseType?.min > 0) {
        validators.push(Validators.minLength(responseType?.min));
      }
      if (responseType?.max > 0 && responseType?.max > responseType?.min) {
        validators.push(Validators.maxLength(responseType?.max));
      }
    }

    if (responseType?.basic_type === 'number') {
      if (responseType?.min > 0) {
        validators.push(Validators.min(responseType?.min));
      }
      if (responseType?.max > 0 && responseType?.max > responseType?.min) {
        validators.push(Validators.max(responseType?.max));
      }
    }

    return validators;
  }

  onSubmit(): void {
    console.log({ form: this.form.value });
    this.formData.emit(this.form.value);
  }

  // TODO: This should not exist! Add more basic_types to the backend
  setElementTypes() {
    this.elementTypes = this.sortedQuestions?.map((fq) => {
      const { min, max, basic_type } = fq.question.response_type;

      if (basic_type === 'text' && max > 300) {
        return 'textarea';
      }

      if (basic_type === 'number' && !(Number.isInteger(min) && Number.isInteger(max))) {
        return 'float';
      }

      return basic_type;
    });
  }

  setHints() {
    this.hints = this.sortedQuestions.map((fq) => {
      const { min, max, basic_type } = fq.question.response_type;
      let hint = '';

      if (basic_type === 'number') {
        if (min > 0 && min < max) {
          hint += `Insira um número de ${min} a ${max}`;
        } else if (min > 0) {
          hint += `Insira um número maior que ${min}`;
        } else if (max > 0) {
          hint += `Insira um número menor que ${max}`;
        }
      }

      if (basic_type === 'text') {
        if (min > 0 && min < max) {
          hint += `O texto deve ter de ${min} a ${max} caracteres`;
        } else if (min > 0) {
          hint += `O texto deve ter maior que ${min} caracteres`;
        } else if (max > 0) {
          hint += `O texto deve ter menor que ${max} caracteres`;
        }
      }

      return hint;
    });
  }

}
