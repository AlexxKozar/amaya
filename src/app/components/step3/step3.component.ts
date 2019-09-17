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

  public validationStatus = {
    form: true,
    top: true,
    left: true,
    right: true
  };

  public imageName: string;

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
    this.calculationService.setSizes(sizes);

    if (this.sizeForm.valid) {
        this.router.navigate(['/step4']);
    } else {
      this._setFormValidationStatus(this.sizeForm, this.validationStatus);
    }
  }

  private _setInitialData(): void {
    const formsData = this.calculationService.getFormsData();
    const { schema } = formsData;
    this.imageName = SCHEMA_IMAGE_FILENAMES[schema];
    this.inputsDisplay = SCHEMA_INPUTS[schema];
  }

  private _initFormControlsByObjectKeys(form: FormGroup, object: any): void {
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

  private _pushFormValuesToArray(form: FormGroup): Array<number> {
    const sizes = [];
    for (const size in form.value) {
      const value = form.value[size];
      if (value) { sizes.push(+value); }
    }
    return sizes;
  }

  private _setFormValidationStatus(form: FormGroup, validationStatus: any): void {
    validationStatus.form = form.valid;
    for (const control in form.controls) {
      validationStatus[control] = this._isControlValid(form.controls[control]);
    }
  }

  private _isControlValid(control: AbstractControl): boolean {
    return control.status === 'VALID';
  }

}
