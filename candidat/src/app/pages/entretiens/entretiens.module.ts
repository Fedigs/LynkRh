import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import {TablesModule} from '../tables/tables.module';
import { EntretiensComponent } from './entretiens.component';
import { routing }       from './entretiens.routing';




@NgModule({
    imports: [
      CommonModule,
      AppTranslationModule,
      FormsModule,
      NgaModule,
      routing
    ],
    declarations: [
        EntretiensComponent
    ]
  })
  export class Entretiens{}