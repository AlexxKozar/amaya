import { Component, OnInit } from '@angular/core';
import { CalculationService } from '@services/calculation.service';
import { Router } from '@angular/router';
import { STYLE_IMAGE_FILENAMES } from '@constants/image-filenames.constant'

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class Step1Component implements OnInit {

  public imageFilenames = STYLE_IMAGE_FILENAMES;

  constructor(
    private router: Router,
    private calculationService: CalculationService
  ) { }

  ngOnInit() {
  }

  public onImageClick(style) {
    this.calculationService.setStyle(style);
    this.router.navigate(['/step2']);
  }

}
