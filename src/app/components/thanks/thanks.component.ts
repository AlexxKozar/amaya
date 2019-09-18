import { Component, OnInit } from '@angular/core';
import { FACEBOOK_LINK } from '@constants/links.constant';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent implements OnInit {

  facebookLink = FACEBOOK_LINK;

  constructor() { }

  ngOnInit() {
  }

}
