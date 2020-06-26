import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import {StartTest} from './startTest.component';
import {Libre} from './components/libre/libre.component';
import {Prog} from './components/prog/prog.component';
import {Qcm} from './components/qcm/qcm.component';
import { routing }       from './startTest.routing';
import {CodemirrorModule} from '@ng4/codemirror';
@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    CodemirrorModule.forRoot()
  ],
  declarations: [
    StartTest,
    Libre,
    Qcm,
    Prog,
  ]
})
export class StartTestModule {

}
