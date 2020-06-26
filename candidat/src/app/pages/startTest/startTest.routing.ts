import { Routes, RouterModule }  from '@angular/router';

import {StartTest} from './startTest.component';
import { ModuleWithProviders } from '@angular/core';
import {GuardService} from './../../guard.service';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: StartTest,
    canActivate:[GuardService],
    children: [
    ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
