import { AbstractControl, ValidatorFn } from "@angular/forms";

export function forbiddenNameValidator(forbiddenName: string): ValidatorFn {
  return (control: AbstractControl): Record<string, unknown> | null => {
    const value = control.value?.toLowerCase();

    if (value === forbiddenName.toLowerCase()) {
      return { forbiddenName: { value: control.value } };
    }
    return null;
  };
}

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): Record<string, unknown> | null => {
    const value = control.value;
    if (value && !/^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/.test(value)) {
      return { invalidPhone: { value } };
    }
    return null;
  };
}
