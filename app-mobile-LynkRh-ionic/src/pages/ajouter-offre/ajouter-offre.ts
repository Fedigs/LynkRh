import { LynkProvider } from './../../providers/lynk/lynk';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the AjouterOffrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajouter-offre',
  templateUrl: 'ajouter-offre.html',
})
export class AjouterOffrePage {
  private content;
  private offre: any;
  private initValues:any = {};
  private selectedLangages = [];
  private selectedFrameworks = [];
  private selectedContrats = [];
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,
    private provider: LynkProvider, public navParams: NavParams) {
    this.offre = this.navParams.get('offre');
    this.offre.titre = "";
    this.provider.getCompetenceInitValues().subscribe(
      res => {
        this.initValues = res;
        console.log('fff',this.initValues);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjouterOffrePage');
    this.offre.langages.map(el => {
      this.selectedLangages.push(el.id);
    });
    this.offre.frameworks.map(el => {
      this.selectedFrameworks.push(el.id);
    });
    this.offre.contrats.map(el => {
      this.selectedContrats.push(el.id);
    });
    this.content = this.offre.description;
  }

  setOffre() {
    console.log('set/*_*/',this.offre.langages);
    // this.selectedLangages.map(el => {
    //   for(let langage of this.offre.langages) {
    //     if(langage.id == el.id) {
    //       console.log(el);
    //     }
    //   }
    // });

    this.offre.langages = [];
    this.selectedLangages.map(el => {
      this.offre.langages.push({id: el});
    });
    this.offre.frameworks = [];
    this.selectedFrameworks.map(el => {
      this.offre.frameworks.push({id: el});
    });
    this.offre.contrats = [];
    this.selectedContrats.map(el => {
      this.offre.contrats.push({ id: el});
    });

    // this.offre.langages = this.selectedLangages;
    // this.offre.frameworks = this.selectedFrameworks;
    // this.offre.contrats = this.selectedContrats;
    this.offre.proprietaire.username = localStorage.getItem("username");
    this.offre.description = this.content;
  }

  spinner = false;
  ajouterOffre() {
    this.spinner = true;
    let success = this.toastCtrl.create({
      message: 'Offre Modifier Avec Success',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'close'
    });

    let error = this.toastCtrl.create({
      message: 'Offre Modifier Avec echec',
      duration: 3000,
      showCloseButton: true,
      closeButtonText: 'close'
    });
    this.setOffre();
    console.log(this.offre);
    console.log('/*_*/',this.selectedLangages);
    console.log(this.offre.langages);
    this.provider.updateOffre(this.offre).subscribe(res => {
      console.log(res);
      success.present();
      this.spinner = false;
    },
    err => {
      console.log(err);
      error.present();
      this.spinner = false;
    });
    this.selectedLangages = [];
    this.selectedFrameworks = [];
    this.selectedContrats = [];
    this.offre.langages = [];
    this.offre.frameworks = [];
    this.offre.contrats = [];
  }

  closemodal() {
    this.navCtrl.pop();
    this.offre.titre = "";
  }

  getMessage(message: string) {
    this.content = message;
    console.log('dsdsd',this.content);
  }

}
