import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalculationService } from '@services/calculation.service';
import { CalculationDataInterface } from '@interfaces/calculation-data.interface';
import { STYLE_IMAGE_FILENAMES } from '@constants/image-filenames.constant'
import { ValidationService } from '@services/validation.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

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

  public formsData: CalculationDataInterface;
  public kitchenImageFilename: string;

  constructor(
    private router: Router,
    private calculationService: CalculationService,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
    this.validationService.formatDataToMoneyFormat(this.calculationData);
    this._setInitialData();
  }

  private _setInitialData() {
    this.calculationData = this.calculationService.calculateKitchenPrice();
    this.validationService.formatDataToMoneyFormat(this.calculationData);
    this.formsData = this.calculationService.getFormsData();
    this.kitchenImageFilename = STYLE_IMAGE_FILENAMES[this.formsData.style];
  }


}
