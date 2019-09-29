import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step1Component } from './components/step1/step1.component';
import { Step2Component } from './components/step2/step2.component';
import { Step3Component } from './components/step3/step3.component';
import { Step4Component } from './components/step4/step4.component';
import { ContactFormComponent } from '@components/contact-form/contact-form.component';
import { ResultComponent } from './components/result/result.component';
import { ThanksComponent } from '@components/thanks/thanks.component';

const routes: Routes = [
  { path: '', component: Step1Component },
  { path: 'step2', component: Step2Component },
  { path: 'step3', component: Step3Component },
  { path: 'step4', component: Step4Component },
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'result', component: ResultComponent },
  { path: 'thanks', component: ThanksComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
