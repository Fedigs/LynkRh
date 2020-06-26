import { Routes, RouterModule }  from '@angular/router';
import { EntretiensComponent } from './entretiens.component';
import { ModuleWithProviders } from '@angular/core';
import {GuardService} from './../../guard.service';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: EntretiensComponent,
    canActivate:[GuardService],
    children: [

    ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
