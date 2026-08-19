import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import {
  forbiddenNameValidator,
  phoneValidator,
} from '../../../../shared/validators/custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  registerForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), forbiddenNameValidator('admin')],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.pattern(this.EMAIL_PATTERN)],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: 'blur',
    }),
    phones: new FormArray([
      new FormControl('', {
        validators: [phoneValidator()],
        updateOn: 'blur',
      }),
    ]),
  });

  get phones(): FormArray {
    return this.registerForm.get('phones') as FormArray;
  }

  addPhone(): void {
    this.phones.push(new FormControl('', Validators.required));
  }

  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;

    this.authService.register({
      email: email ?? '',
      password: password ?? '',
      name: name ?? '',
    }).subscribe({
      next: () => {
        // localStorage.setItem('token', response.token);
        console.log('✅ Регистрация успешна');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('❌ Ошибка регистрации:', err);
      },
    });
  }
}
