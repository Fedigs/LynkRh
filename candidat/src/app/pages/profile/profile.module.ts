import { NgModule }      from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { CommonModule }  from '@angular/common';
import { AppTranslationModule } from '../../app.translation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TablesModule} from '../tables/tables.module';
import { Profile } from './profile.component';
import { routing }       from './profile.routing';
import { Ng2CompleterModule } from "ng2-completer";
import { MyDatePickerModule } from 'mydatepicker';
import {AutoCompleterModule} from './../autoCompleter/autoCompleter.module';
import {NgSelectModule} from '@ng-select/ng-select';
@NgModule({
  imports: [
    NgaModule,
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    routing,Ng2CompleterModule,MyDatePickerModule,AutoCompleterModule,NgSelectModule
  ],
  declarations: [
    Profile
  ]
})
export class ProfileModule {}
