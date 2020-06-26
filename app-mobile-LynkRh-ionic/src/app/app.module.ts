import { SettingPage } from './../pages/setting/setting';
import { AutoHideDirective } from './../directives/auto-hide/auto-hide';
import { AjouterOffrePage } from './../pages/ajouter-offre/ajouter-offre';
import { CvAnonymesPage } from './../pages/cv-anonymes/cv-anonymes';
import { RhlynkOffreDetailPage } from './../pages/rhlynk-offre-detail/rhlynk-offre-detail';
import { RhlynkOffrePage } from './../pages/rhlynk-offre/rhlynk-offre';
import { RhlynkLoginPage } from './../pages/rhlynk-login/rhlynk-login';
import { SharedModule } from './shared.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MODULES, PROVIDERS } from './app.imports';
import { HomePage } from '../pages/_home/home';
import { LynkProvider } from '../providers/lynk/lynk';
import { TabsPage } from '../pages/tabs/tabs';
import { CvAnonymeDetailPage } from '../pages/cv-anonyme-detail/cv-anonyme-detail';
import { EntretienDefinitifPage, ElasticTextarea } from '../pages/entretien-definitif/entretien-definitif';
import { EditerOffrePage } from '../pages/editer-offre/editer-offre';

@NgModule({
  declarations: [
    // App Core
    MyApp,
    HomePage,
    RhlynkLoginPage,
    RhlynkOffrePage,
    TabsPage,
    RhlynkOffreDetailPage,
    CvAnonymesPage,
    CvAnonymeDetailPage,
    EntretienDefinitifPage,
    ElasticTextarea,
    EditerOffrePage,
    AjouterOffrePage,
    AutoHideDirective,
    SettingPage
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(MyApp),
    SharedModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RhlynkLoginPage,
    RhlynkOffrePage,
    TabsPage,
    RhlynkOffreDetailPage,
    CvAnonymesPage,
    CvAnonymeDetailPage,
    EntretienDefinitifPage,
    ElasticTextarea,
    EditerOffrePage,
    AjouterOffrePage,
    SettingPage
  ],
  providers: [PROVIDERS, { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
