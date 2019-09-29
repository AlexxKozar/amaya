import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CalculationService} from '@services/calculation.service';
import {ValidationService} from '@services/validation.service';
import {HttpService} from '@services/http.service';
import {CalculationDataInterface} from '@interfaces/calculation-data.interface';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  public validationStatus = {
    form: true,
    name: true,
    phone: true
  };

  public contactForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3)
    ]),
    phone: new FormControl(null, [
      Validators.required,
    ]),
  });

  private calculationData: any;
  public formsData: CalculationDataInterface;

  constructor(
    private router: Router,
    private calculationService: CalculationService,
    private validationService: ValidationService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this._setInitialData();
  }

  onFormSubmit() {
    const body = {
      calculationData: this.calculationData,
      formsData: this.formsData,
      contactData: this.contactForm.value
    };

    if (this.contactForm.valid) {
      this.httpService.sendResultData(body).subscribe((resp: {status: string}) => {
          console.log('resp', resp);
          if (resp.status === 'ok') {
            this.router.navigate(['/result']);
          }
        },
        error => {
          // TODO handle exception
          console.log(error);
        });
    } else {
      this.validationService.setFormValidationStatus(this.contactForm, this.validationStatus);
    }
  }

  private _setInitialData() {
    this.calculationData = this.calculationService.calculateKitchenPrice();
    this.validationService.formatDataToMoneyFormat(this.calculationData);
    this.formsData = this.calculationService.getFormsData();
  }

}
