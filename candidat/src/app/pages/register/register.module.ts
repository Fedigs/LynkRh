import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2CompleterModule } from "ng2-completer";
import { Register } from './register.component';
import { routing }       from './register.routing';
import {AutoCompleterModule} from './../autoCompleter/autoCompleter.module';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,Ng2CompleterModule,
    routing,AutoCompleterModule
  ],
  declarations: [
    Register
  ]
})
export class RegisterModule {}
