import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalculationService } from '@services/calculation.service';
import { CalculationDataInterface } from '@interfaces/calculation-data.interface';
import { STYLE_IMAGE_FILENAMES } from '@constants/image-filenames.constant'
import { ValueFormattersHelpers } from '@helpers/value-formatters.helpers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@services/validation.service';
import { HttpService } from '@services/http.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  public resultForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3)
      ]),
    phone: new FormControl(null, [
        Validators.required,
      ]),
  });

  public calculationData = {
    totalPrice: 0,
    configurationPrice: 0,
    kitchenPrice: 0,
    downPrice: 0,
    mezzaninePrice: 0,
    islandPrice: 0,
    freezerPrice: 0,
    ovenPrice: 0,
    shelvesPrice: 0,
    mountingPrice: 0,
    deliveryPrice: 0
  };

  public validationStatus = {
    form: true,
    name: true,
    phone: true
  };
  public formsData: CalculationDataInterface;
  public kitchenImageFilename: string;

  constructor(
    private router: Router,
    private calculationService: CalculationService,
    private validationService: ValidationService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this._formatDataToMoneyFormat(this.calculationData);
    this._setInitialData();
  }

  onFormSubmit() {
    const body = {
      calculationData: this.calculationData,
      formsData: this.formsData,
      contactData: this.resultForm.value
    };

    if (this.resultForm.valid) {
      this.httpService.sendResultData(body).subscribe((resp: {status: string}) => {
          console.log('resp', resp);
          if (resp.status === 'ok') {
            this.router.navigate(['/thanks']);
          }
        },
        error => {
          // TODO handle exception
          console.log(error);
        });
    } else {
      this.validationService.setFormValidationStatus(this.resultForm, this.validationStatus);
     }
  }

  private _setInitialData() {
    this.calculationData = this.calculationService.calculateKitchenPrice();
    this._formatDataToMoneyFormat(this.calculationData);
    this.formsData = this.calculationService.getFormsData();
    this.kitchenImageFilename = STYLE_IMAGE_FILENAMES[this.formsData.style];
  }

  private _formatDataToMoneyFormat(data) {
    for (const key in data) {
      data[key] = ValueFormattersHelpers.toMoneyFormat(data[key]) + ' грн';
    }
  }

}
