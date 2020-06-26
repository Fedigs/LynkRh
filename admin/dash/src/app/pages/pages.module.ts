import { CapitalizePipe } from './../capitalize.pipe';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';

import { FusionChartsModule } from 'angular4-fusioncharts';

import { routing }       from './pages.routing';
import { Pages } from './pages.component';
import { HomeComponent } from './home/home.component';
import { CvComponent } from './cv/cv.component';
import { OffresComponent } from './offres/offres.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { QuestionsComponent } from './questions/questions.component';
import { SimulationComponent } from './simulation/simulation.component';
import { TestsComponent } from './tests/tests.component';
import { TestResultatComponent } from './test-resultat/test-resultat.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { CompetencesComponent } from './competences/competences.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ReponsesQcmComponent } from './reponses-qcm/reponses-qcm.component';
import { ReponsesLibreComponent } from './reponses-libre/reponses-libre.component';
import {GlobalModule} from './../global.module';
import { ResultatsComponent } from './resultats/resultats.component';
import { DetailsResultatComponent } from './details-resultat/details-resultat.component';
import { CandidatResultatComponent } from './candidat-resultat/candidat-resultat.component';
import { LoadComponent } from '../ui/load/load.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SpinnerComponent } from '../ui/spinner/spinner.component';
@NgModule({
  imports: [CommonModule, routing,BsDatepickerModule.forRoot(),
    FormsModule,GlobalModule,FusionChartsModule.forRoot(FusionCharts, Charts, FintTheme)],
  declarations: [
    HomeComponent,
    CvComponent,
    OffresComponent,
    QuestionDetailsComponent,
    QuestionsComponent,
    SimulationComponent,
    TestsComponent,
    CompetencesComponent,
    ReponsesQcmComponent,
    ReponsesLibreComponent, 
    TestDetailsComponent,
    AccountsComponent,
    TestResultatComponent,
    Pages,
    ResultatsComponent,
    DetailsResultatComponent,
    CandidatResultatComponent,
    LoadComponent,
    SpinnerComponent
  ],
  exports: [BsDatepickerModule]
})
export class PagesModule {
}
