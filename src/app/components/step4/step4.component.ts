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

  // public configurationModel: CalculationDataInterface['configuration'] = {
  //   down: {selected: false},
  //   freezer: {selected: false},
  //   oven: {selected: false},
  //   mezzanine: {selected: false},
  //   shelves: {selected: false},
  //   island: {
  //     selected: false,
  //     size: 0
  //   },
  // };

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
      // this._setConfigurationModelByFormValue(this.configurationModel, this.configurationForm);
      this.calculationService.setConfiguration(this.configurationForm.value);
      this.router.navigate(['/result']);
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

  // private _setConfigurationModelByFormValue(configuration: CalculationDataInterface['configuration'], form: FormGroup) {
  //   const formValue = form.value;
  //   configuration.down.selected = formValue.downSelection;
  //   configuration.freezer.selected = formValue.freezerSelection;
  //   configuration.mezzanine.selected = formValue.mezzanineSelection;
  //   configuration.shelves.selected = formValue.shelvesSelection;
  //   configuration.island.selected = formValue.islandSelection;
  //   configuration.island.size = formValue.islandSize;
  // }

}
