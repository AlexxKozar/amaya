import { Component, OnInit } from '@angular/core';
import { CalculationService } from '@services/calculation.service';
import { Router } from '@angular/router';
import { SCHEMA_IMAGE_FILENAMES } from '@constants/image-filenames.constant';
import { SCHEMA_INPUTS } from '@constants/schema-inputs.constant';
@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  public sizeModel = {
    l1: 0,
    l2: 0,
    l3: 0,
  };
  public imageName: string;
  public inputsDisplay = {
    top: false,
    left: false,
    right: false
  };

  constructor(
    private router: Router,
    private calculationService: CalculationService
  ) { }

  ngOnInit() {
    this._setInitialData();
  }

  public onFormSubmit() {
    const sizes = [
      this.sizeModel.l1,
      this.sizeModel.l2,
      this.sizeModel.l3
    ];
    this.calculationService.setSizes(sizes);
    this.router.navigate(['/step4']);
  }

  private _setInitialData() {
    const formsData = this.calculationService.getFormsData();
    const { schema } = formsData;
    this.imageName = SCHEMA_IMAGE_FILENAMES[schema];
    this.inputsDisplay = SCHEMA_INPUTS[schema];
  }

}
