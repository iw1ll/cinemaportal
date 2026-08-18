import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  forbiddenNameValidator,
  phoneValidator,
} from '../../../../shared/validators/custom-validators';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  registerForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2), forbiddenNameValidator('admin')],
      updateOn: 'blur',
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      updateOn: 'blur',
    }),
    phones: new FormArray([
      new FormControl('', {
        validators: [Validators.required, phoneValidator()],
        updateOn: 'blur',
      }),
    ]),
  });

  /** Получить FormArray телефонов */
  get phones(): FormArray {
    return this.registerForm.get('phones') as FormArray;
  }

  /** Добавить телефон */
  addPhone(): void {
    this.phones.push(new FormControl('', Validators.required));
  }

  /** Удалить телефон по индексу */
  removePhone(index: number): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      console.log(this.registerForm.get('password')?.errors);
      console.log(this.registerForm.get('password')?.value);
    }
  }
}
