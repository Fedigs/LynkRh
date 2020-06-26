import { CvAnonymeComponent } from './cv-anonyme/cv-anonyme.component';

import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {RouteGuard} from './../guard';
import { HomeComponent } from './home/home.component';
import { CvComponent } from './cv/cv.component';
import { OffresComponent } from './offres/offres.component';







import { AccountsComponent } from './accounts/accounts.component';
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
      { path: 'cv',      component: CvComponent ,canActivate:[RouteGuard]},
      { path: 'offres',      component: OffresComponent ,canActivate:[RouteGuard]},
      { path: 'accounts',      component: AccountsComponent,canActivate:[RouteGuard]},
      { path: 'cv-anonymes', component: CvAnonymeComponent,canActivate:[RouteGuard]}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
