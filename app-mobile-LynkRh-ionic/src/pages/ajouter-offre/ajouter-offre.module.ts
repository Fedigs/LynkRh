import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AjouterOffrePage } from './ajouter-offre';

@NgModule({
  declarations: [
    AjouterOffrePage,
  ],
  imports: [
    IonicPageModule.forChild(AjouterOffrePage),
  ],
})
export class AjouterOffrePageModule {}
