import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { FormQuestion } from 'src/app/models/formQuestion';
import { FormFull } from './../../../models/form';
import { SolicitationsService } from './../solicitations.service';

@Component({
  selector: 'app-solicitations-form-fill',
  templateUrl: './solicitations-form-fill.component.html',
  styleUrls: ['./solicitations-form-fill.component.css'],
})
export class SolicitationsFormFillComponent implements OnInit {
  @Input() formType: FormFull;
  isTouch = window.matchMedia('(pointer: coarse)').matches;
  form: FormGroup;
  answers: FormArray;
  hints: string[];
  elementTypes: string[];
  sortedQuestions: FormQuestion[];

  constructor(private solicitationsService: SolicitationsService) {
  }

  ngOnInit(): void {
    this.sortedQuestions = this.formType?.form_questions?.sort((a, b) => a.order - b.order);
    this.buildForm();
    this.setHints();
    this.setElementTypes();
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


    console.log({
      form: this.form,
      answers: this.answers
    });
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
    console.log('Enviando Solicitação');

    this.solicitationsService.createSolicitation(this.form.value).subscribe({
      next: (solicitation) => {
        console.log(solicitation);
      },
      error: (error) => {
        console.error(error);
      }
    });
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
