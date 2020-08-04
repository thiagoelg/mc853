import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { AuthService } from 'src/app/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  errorMsg: string = null;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    public authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.registerService.register(this.form.value).subscribe({
      next: () => this.registered(),
      error: (error) => {
        this.errorMsg = error.error.message;
      }
    });
  }

  registered() {
    const email = this.form.controls.email.value;
    const password = this.form.controls.password.value;
    if (this.authService.user) {
      this.router.navigate(['/users/list']);
    } else {
      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      });
    }
  }
}
