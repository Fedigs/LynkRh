import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {GuardService} from './../guard.service';

// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule',
    canActivate:[GuardService],
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule',
    canActivate:[GuardService],
  },
  {
    path: 'pages',
    component: Pages,
    canActivate:[GuardService],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
      { path: 'tests', loadChildren: './tests/tests.module#TestsModule' },
      { path: 'start-test', loadChildren: './startTest/startTest.module#StartTestModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
      { path: 'entretiens', loadChildren: './entretiens/entretiens.module#Entretiens'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
