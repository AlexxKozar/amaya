import { Component, OnInit } from '@angular/core';
import { CalculationService } from '@services/calculation.service';
import { CalculationDataInterface } from '@interfaces/calculation-data.interface';
import { Router } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {ValidationService} from '@services/validation.service';
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {

  public inputsDisplayConfig = {
    islandSize: false
  };

  public configurationForm = new FormGroup({
    downSelection: new FormControl(),
    freezerSelection: new FormControl(),
    ovenSelection: new FormControl(),
    mezzanineSelection: new FormControl(),
    shelvesSelection: new FormControl(),
    islandSelection: new FormControl(),
    islandSize: new FormControl()
  });

  public validationStatus = {
    form: true,
    islandSize: true
  };

  constructor(
    private router: Router,
    private calculationService: CalculationService,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.validationService.setFormControlsValidationByConfig(this.configurationForm, this.inputsDisplayConfig);
    this._setControlsChangeSubscription();
  }

  public onFormSubmit() {
    if (this.configurationForm.valid) {
      this.calculationService.setConfiguration(this.configurationForm.value);
      this.router.navigate(['/contact-form']);
    } else {
      this.validationService.setFormValidationStatus(this.configurationForm, this.validationStatus);
    }
  }

  private _setControlsChangeSubscription() {
    this.configurationForm.get('islandSelection').valueChanges.subscribe(isSelected => {
      this.inputsDisplayConfig.islandSize = isSelected;
      this.validationService.setFormControlsValidationByConfig(this.configurationForm, this.inputsDisplayConfig);
      if (!isSelected) {
        this.validationService.setFormValidationStatus(this.configurationForm, this.validationStatus);
      }
    });
  }
}
