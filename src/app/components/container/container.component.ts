import { Component, OnInit} from '@angular/core';
import { PHONE_NUMBER, SHOWROOM_ADDRESS } from '@constants/contact-data.constant';
import { FACEBOOK_LINK, TELEGRAM_LINK, INSTAGRAM_LINK, VIBER_LINK } from '@constants/links.constant';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  public phoneNumber: string = PHONE_NUMBER;
  public showroomAddress: string = SHOWROOM_ADDRESS;
  public facebookLink: string = FACEBOOK_LINK;
  public telegramLink: string = TELEGRAM_LINK;
  public instagramLink: string = INSTAGRAM_LINK;
  public viberLink: string = VIBER_LINK;

  constructor() { }

  ngOnInit() {
  }

  onActivate(componentReference) {
  }
}
