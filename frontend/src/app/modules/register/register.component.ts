import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  hidePassword = true;

  constructor(private fb: FormBuilder, private registerService: RegisterService) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required /*, Validators.email */]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    // this.form.valueChanges.subscribe({ next: (formValues) => console.log({ formValues }) });
  }

  onSubmit() {
    this.registerService.register(this.form.value).subscribe({
      next: () => this.registered(),
    });
  }

  registered() {
    console.log('registered');
  }
}
