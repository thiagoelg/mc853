import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormQuestion } from 'src/app/models/formQuestion';
import { FormFull } from './../../../models/form';

@Component({
  selector: 'app-solicitations-form-fill',
  templateUrl: './solicitations-form-fill.component.html',
  styleUrls: ['./solicitations-form-fill.component.css'],
})
export class SolicitationsFormFillComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Input() formType: FormFull;
  isTouch = window.matchMedia('(pointer: coarse)').matches;
  form: FormGroup;
  hints: string[];
  elementTypes: string[];

  ngOnInit(): void {
    this.buildForm();
    this.setHints();
    this.setElementTypes();
  }

  private buildForm() {
    this.form = new FormGroup(this.buildControls());
  }

  private buildControls(): { [key: string]: AbstractControl } {
    const obj = {};

    this.formType?.questions?.forEach((formQuestion) => {
      obj[formQuestion?.question?.id] = this.toControl(formQuestion);
    });

    return obj;
  }

  private toControl = (formQuestion: FormQuestion) =>
    new FormControl(undefined, this.toValidators(formQuestion));

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
    console.log('oi');
  }

  // TODO: This should not exist! Add more basic_types to the backend
  setElementTypes() {
    this.elementTypes = this.formType.questions.map((fq) => {
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
    this.hints = this.formType.questions.map((fq) => {
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
