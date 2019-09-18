import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from '@components/container/container.component';
import { Step1Component } from '@components/step1/step1.component';
import { Step2Component } from '@components/step2/step2.component';
import { Step3Component } from '@components/step3/step3.component';
import { Step4Component } from '@components/step4/step4.component';
import { ResultComponent } from '@components/result/result.component';
import { ModalComponent } from '@components/modal/modal.component';
import { ThanksComponent } from './components/thanks/thanks.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    ResultComponent,
    ModalComponent,
    ThanksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
