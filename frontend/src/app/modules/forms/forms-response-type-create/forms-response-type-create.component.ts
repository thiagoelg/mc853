import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../forms.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forms-response-type-create',
  templateUrl: './forms-response-type-create.component.html',
  styleUrls: ['./forms-response-type-create.component.css'],
})
export class FormsResponseTypeCreateComponent implements OnInit {
  form: FormGroup;

  labels = {
    min: 'Mínimo',
    max: 'Máximo',
  };

  basicTypes = [
    { value: 'text', viewValue: 'Texto' },
    { value: 'number', viewValue: 'Numero' },
    { value: 'date', viewValue: 'Data' },
    { value: 'file', viewValue: 'Arquivo' },
  ];

  hidePassword = true;

  constructor(private fb: FormBuilder, private formService: FormsService, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      basic_type: ['', [Validators.required]],
      min: [null],
      max: [null],
      regex: ['', [this.regexValidator]],
    });

    this.form.controls.basic_type.valueChanges.subscribe({
      next: (type) => {
        this.setLabels(type);
      },
    });
  }

  onSubmit() {
    this.formService.createResponseType(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/forms/response-types/list']);
      },
    });
  }

  regexValidator(control: AbstractControl): { [key: string]: boolean } | null {
    try {
      const a = new RegExp(control.value);
      return null;
    } catch (e) {
      return { regex: true };
    }
  }

  validate(value: string): boolean {
    return value.match(this.form.value.regex)?.length > 0;
  }

  setLabels(basicType: string) {
    switch (basicType) {
      case 'text':
        this.labels.min = 'Mínimo de caracteres';
        this.labels.max = 'Máximo de caracteres';
        break;
      case 'file':
        this.labels.min = 'Tamanho mínimo (MB)';
        this.labels.max = 'Tamanho máximo (MB)';
        break;

      default:
        this.labels.min = 'Mínimo';
        this.labels.max = 'Máximo';
        break;
    }
  }
}
