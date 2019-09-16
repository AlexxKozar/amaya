import { Component, OnInit } from '@angular/core';
import { CalculationService } from '@services/calculation.service';
import { Router } from '@angular/router';
import { SCHEMA_IMAGE_FILENAMES } from '@constants/image-filenames.constant';
import { SCHEMA_INPUTS } from '@constants/schema-inputs.constant';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  public sizeForm = new FormGroup({
    top: new FormControl(),
    left: new FormControl(),
    right: new FormControl()
  });

  public inputsDisplay = {
    top: false,
    left: false,
    right: false
  };

  public imageName: string;
  public validationStatus = {
    form: true,
    top: true,
    left: true,
    right: true
  };

  constructor(
    private router: Router,
    private calculationService: CalculationService
  ) { }

  ngOnInit() {
    this._setInitialData();
    this._initFormControlsByObjectKeys(this.sizeForm, this.inputsDisplay);
  }

  public onFormSubmit() {
    const sizes = this._pushFormValuesToArray(this.sizeForm);
    console.log('sizes', sizes);
    this.calculationService.setSizes(sizes);

    if (this.sizeForm.valid) {
        this.router.navigate(['/step4']);
    } else {
      this.validationStatus = this._setFormValidationStatus(this.sizeForm);
    }
  }

  private _setInitialData() {
    const formsData = this.calculationService.getFormsData();
    const { schema } = formsData;
    this.imageName = SCHEMA_IMAGE_FILENAMES[schema];
    this.inputsDisplay = SCHEMA_INPUTS[schema];
  }

  private _initFormControlsByObjectKeys(form: FormGroup, object: any) {
    for (const key in object) {
      if (object[key]) {
        form.setControl(key, new FormControl(null,  [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(2)
        ]));
      }
    }
  }

  private _pushFormValuesToArray(form: FormGroup) {
    const sizes = [];
    for (const size in form.value) {
      const value = form.value[size];
      if (value) { sizes.push(+value); }
    }
    return sizes;
  }

  private _setFormValidationStatus(form: FormGroup) {
    const validationStatus = {
      form: form.valid,
      top: true,
      left: true,
      right: true
    };
    for (const control in form.controls) {
      validationStatus[control] = this._isControlValid(form.controls[control]);
    }
    return validationStatus;
  }

  private _isControlValid(control: AbstractControl) {
    return control.status === 'VALID';
  }

}
