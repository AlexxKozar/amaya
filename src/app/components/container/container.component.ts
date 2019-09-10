import { Component, OnInit } from '@angular/core';
import { PHONE_NUMBER, SHOWROOM_ADDRESS } from '@constants/contact-data.constant';
import { FACEBOOK_LINK, TELEGRAM_LINK, INSTAGRAM_LINK, VIBER_LINK } from '@constants/links.constant';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  phoneNumber: string = PHONE_NUMBER;
  showroomAddress: string = SHOWROOM_ADDRESS;
  facebookLink: string = FACEBOOK_LINK;
  telegramLink: string = TELEGRAM_LINK;
  instagramLink: string = INSTAGRAM_LINK;
  viberLink: string = VIBER_LINK;

  constructor() { }

  ngOnInit() {
  }

}
