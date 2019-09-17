import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  public setFormControlsValidationByConfig(form: FormGroup, config: any): void {
    for (const key in config) {
      if (config[key]) {
        form.setControl(key, new FormControl(null,  [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(2)
        ]));
      } else {
        form.setControl(key, new FormControl());
      }
    }
  }

  public setFormValidationStatus(form: FormGroup, validationStatus: any): void {
    validationStatus.form = form.valid;
    for (const control in form.controls) {
      validationStatus[control] = this.isControlValid(form.controls[control]);
    }
  }

  public isControlValid(control: AbstractControl): boolean {
    return control.status === 'VALID';
  }


}
