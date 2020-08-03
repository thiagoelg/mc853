import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hidePassword = true;
  errorMsg: string = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required /*, Validators.email */]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    // this.form.valueChanges.subscribe({ next: (formValues) => console.log({ formValues }) });
  }

  onSubmit() {
    this.authService.login(this.form.value).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        this.errorMsg = error.error.message;
      },
    });
  }
}
