import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import {CandidatService} from './../candidat.service';
import { Pages } from './pages.component';
import { EntretiensComponent } from './entretiens/entretiens.component';
@NgModule({
  imports: [CommonModule, AppTranslationModule, NgaModule, routing],
  declarations: [Pages],
  providers:[CandidatService]
})
export class PagesModule {
}
