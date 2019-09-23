import { Component } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SHOWROOM_ADDRESS, PHONE_NUMBER1, PHONE_NUMBER2 } from '@constants/contact-data.constant';
import {
  FACEBOOK_LINK,
  TELEGRAM_LINK,
  INSTAGRAM_LINK,
  VIBER_LINK,
  PHONE_NUMBER1_LINK,
  PHONE_NUMBER2_LINK,
  SHOWROOM_ADDRESS_LINK,
} from '@constants/links.constant';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '@services/validation.service';
import {HttpService} from '@services/http.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  public showroomAddress: string = SHOWROOM_ADDRESS;
  public phoneNumber1: string = PHONE_NUMBER1;
  public phoneNumber2: string = PHONE_NUMBER2;
  public facebookLink: string = FACEBOOK_LINK;
  public telegramLink: string = TELEGRAM_LINK;
  public instagramLink: string = INSTAGRAM_LINK;
  public viberLink: string = VIBER_LINK;
  public phoneNumber1Link: string = PHONE_NUMBER1_LINK;
  public phoneNumber2Link: string = PHONE_NUMBER2_LINK;
  public showroomAddressLink: string = SHOWROOM_ADDRESS_LINK;

  public modalRef: BsModalRef;

  public validationStatus = {
    form: true,
    name: true,
    phone: true
  };

  public consultForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3)
    ]),
    phone: new FormControl(null, [
      Validators.required,
    ]),
  });

  constructor(
    private modalService: BsModalService,
    private validationService: ValidationService,
    private httpService: HttpService,
    private router: Router,
  ) { }

  public onActivate(event: any) {
    this._scrollWindowTop();
  }

  public openConsultModal(template) {
    this.modalRef = this.modalService.show(template);
  }

  public onFormSubmit() {
    const body = this.consultForm.value;

    if (this.consultForm.valid) {
      this.httpService.sendContactData(body).subscribe((resp: {status: string}) => {
          console.log('resp', resp);
          if (resp.status === 'ok') {
            this.modalRef.hide();
            this.router.navigate(['/thanks']);
          }
        },
        error => {
          // TODO handle exception
          console.log(error);
        });
    } else {
      this.validationService.setFormValidationStatus(this.consultForm, this.validationStatus);
    }
  }

  private _scrollWindowTop() {
    window.scroll(0, 0);
  }

}
