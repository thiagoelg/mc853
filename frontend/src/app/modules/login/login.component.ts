import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  hidePassword = true;

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required /*, Validators.email */]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    // this.form.valueChanges.subscribe({ next: (formValues) => console.log({ formValues }) });
  }

  onSubmit() {
    this.loginService.login(this.form.value).subscribe({
      next: () => this.logged(),
      error: (error: HttpErrorResponse) => console.log(error),
    });
  }

  logged() {
    console.log('logged');
    console.log('logged');
  }
}
