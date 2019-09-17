import { Component, OnInit } from '@angular/core';
import { CalculationService } from '@services/calculation.service';
import { ValidationService } from '@services/validation.service';
import { Router } from '@angular/router';
import { SCHEMA_IMAGE_FILENAMES } from '@constants/image-filenames.constant';
import { SCHEMA_INPUTS } from '@constants/schema-inputs.constant';
import { FormControl, FormGroup } from '@angular/forms';

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

  public inputsDisplayConfig = {
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
    private calculationService: CalculationService,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this._setInitialData();
    this.validationService.setFormControlsValidationByConfig(this.sizeForm, this.inputsDisplayConfig);
  }

  public onFormSubmit() {
    const sizes = this._pushFormValuesToArray(this.sizeForm);
    this.calculationService.setSizes(sizes);

    if (this.sizeForm.valid) {
        this.router.navigate(['/step4']);
    } else {
      this.validationService.setFormValidationStatus(this.sizeForm, this.validationStatus);
    }
  }

  private _setInitialData(): void {
    const formsData = this.calculationService.getFormsData();
    const { schema } = formsData;
    this.imageName = SCHEMA_IMAGE_FILENAMES[schema];
    this.inputsDisplayConfig = SCHEMA_INPUTS[schema];
  }

  private _pushFormValuesToArray(form: FormGroup): Array<number> {
    const sizes = [];
    for (const size in form.value) {
      const value = form.value[size];
      if (value) { sizes.push(+value); }
    }
    return sizes;
  }

}
