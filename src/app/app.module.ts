import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { Step1Component } from './components/step1/step1.component';
import { ModalComponent } from './components/modal/modal.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { ResultComponent } from './components/result/result.component';
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    Step1Component,
    ModalComponent,
    Step2Component,
    Step3Component,
    Step4Component,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
