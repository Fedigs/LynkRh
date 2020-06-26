import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AutoCompleter} from './autoCompleter.component';
import {FilterPipe} from './pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ],
  declarations: [
    AutoCompleter,FilterPipe
  ],exports:[AutoCompleter,FilterPipe]
})
export class AutoCompleterModule {}
