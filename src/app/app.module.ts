import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from '@components/container/container.component';
import { Step1Component } from '@components/step1/step1.component';
import { Step2Component } from '@components/step2/step2.component';
import { Step3Component } from '@components/step3/step3.component';
import { Step4Component } from '@components/step4/step4.component';
import { ResultComponent } from '@components/result/result.component';
import { ThanksComponent } from '@components/thanks/thanks.component';
import { HttpService } from '@services/http.service';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    ResultComponent,
    ThanksComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {provide: 'googleTagManagerId',  useValue: 'GTM-MF2GCK2'},
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
