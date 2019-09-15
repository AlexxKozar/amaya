import { Component, OnInit } from '@angular/core';
import { CalculationService } from '@services/calculation.service';
import { CalculationDataInterface } from '@interfaces/calculation-data.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {

  configurationModel: CalculationDataInterface['configuration'] = {
    down: {selected: false},
    freezer: {selected: false},
    oven: {selected: false},
    mezzanine: {selected: false},
    shelves: {selected: false},
    island: {
      selected: false,
      size: 0
    },
  };

  constructor(
    private router: Router,
    private calculationService: CalculationService
  ) { }

  ngOnInit() {
  }

  public onFormSubmit() {
    this.calculationService.setConfiguration(this.configurationModel);
    console.log(this.calculationService.calculateKitchenPrice());
    this.router.navigate(['/result']);
  }

}
