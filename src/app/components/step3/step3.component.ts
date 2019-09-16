import { Component, OnInit } from '@angular/core';
import { CalculationService } from '@services/calculation.service';
import { Router } from '@angular/router';
import { SCHEMA_IMAGE_FILENAMES } from '@constants/image-filenames.constant';
import { SCHEMA_INPUTS } from '@constants/schema-inputs.constant';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  public formInvalid = false;

  constructor(
    private router: Router,
    private calculationService: CalculationService
  ) { }

  ngOnInit() {
    this._setInitialData();
    this._initFormControlsByObjectKeys(this.sizeForm, this.inputsDisplay);
  }

  public onFormSubmit() {
    const sizes = [];
    for (const size of this.sizeForm.value) {
      if (size) { sizes.push(size); }
    }
    this.calculationService.setSizes(sizes);

    if (this.sizeForm.valid) {
        this.router.navigate(['/step4']);
    } else {
      this.formInvalid = true;
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

}
