import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.EMAIL_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    phones: new FormArray([new FormControl('', Validators.required)]),
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
    }
  }
}
