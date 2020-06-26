import { Routes, RouterModule }  from '@angular/router';

import { Profile } from './profile.component';
import { ModuleWithProviders } from '@angular/core';
import {GuardService} from './../../guard.service';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Profile,
    canActivate:[GuardService],
    data: {
      menu: {
        title: 'Profile',
        icon: 'ion-compose',
        selected: false,
        expanded: false,
        order: 400,
      }
    },
    children: [
    ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
