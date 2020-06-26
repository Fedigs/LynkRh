import { CandidatResultatComponent } from './candidat-resultat/candidat-resultat.component';
import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {RouteGuard} from './../guard';
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
import { DetailsResultatComponent } from './details-resultat/details-resultat.component';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
    canActivate:[RouteGuard],
  },
  {
    path: 'pages',
    component: Pages,
    canActivate:[RouteGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' ,canActivate:[RouteGuard]},
      { path: 'dashboard', component:HomeComponent,canActivate:[RouteGuard] },
      { path: 'questions',      component: QuestionsComponent,canActivate:[RouteGuard]},
      { path: 'cv',      component: CvComponent ,canActivate:[RouteGuard]},
      { path: 'offres',      component: OffresComponent ,canActivate:[RouteGuard]},
      { path: 'question',      component: QuestionDetailsComponent,canActivate:[RouteGuard]},
      { path: 'simulation',      component: SimulationComponent,canActivate:[RouteGuard]},
      { path: 'tests',      component: TestsComponent ,canActivate:[RouteGuard]},
      { path: 'test',      component: TestDetailsComponent,canActivate:[RouteGuard]},
      { path: 'test-resultat',      component: TestResultatComponent,canActivate:[RouteGuard]},
      { path: 'competences',      component: CompetencesComponent ,canActivate:[RouteGuard]},
      { path: 'accounts',      component: AccountsComponent,canActivate:[RouteGuard]},
      { path: 'resultat/details', component: DetailsResultatComponent,canActivate:[RouteGuard]},
      { path: 'resultat/candidat-resultat', component: CandidatResultatComponent,canActivate:[RouteGuard]}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
