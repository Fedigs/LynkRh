import { LoadComponent } from './../ui/load/load.component';
import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';

import { FusionChartsModule } from 'angular4-fusioncharts';

import { routing }  from './pages.routing';
import { Pages } from './pages.component';
import { HomeComponent } from './home/home.component';
import { CvComponent } from './cv/cv.component';
import { OffresComponent } from './offres/offres.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';







import { AccountsComponent } from './accounts/accounts.component';


import { GlobalModule } from './../global.module';
import { CvAnonymeComponent } from './cv-anonyme/cv-anonyme.component';
import { BounceComponent } from '../ui/bounce/bounce.component';

@NgModule({
  imports: [CommonModule,BsDatepickerModule.forRoot(), 
    routing,FormsModule,GlobalModule,FusionChartsModule.forRoot(FusionCharts, Charts, FintTheme)],
  declarations: [
    HomeComponent,
    CvComponent,
    OffresComponent,
    AccountsComponent,
    Pages,
    CvAnonymeComponent,
    LoadComponent,
    BounceComponent
  ],
  exports: [BsDatepickerModule]
})
export class PagesModule {
}
