import { Component, OnInit } from '@angular/core';
import { CalculationService } from '@services/calculation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
  constructor(
    private router: Router,
    private calculationService: CalculationService
  ) { }

  ngOnInit() {
  }

  public onImageClick(schema: number) {
    this.calculationService.setSchema(schema);
    this.router.navigate(['/step3']);
  }
}
