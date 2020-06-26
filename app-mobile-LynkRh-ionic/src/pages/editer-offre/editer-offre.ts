import { RhlynkOffreDetailPage } from './../rhlynk-offre-detail/rhlynk-offre-detail';
import { LynkProvider } from './../../providers/lynk/lynk';
import { Component, EventEmitter, Output, ViewChild, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the EditerOffrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editer-offre',
  templateUrl: 'editer-offre.html',
})
export class EditerOffrePage {

  private content;
  private offre: any = {langages:[],frameworks:[],contrats:[],test:{},titre:"",description:"",proprietaire:{}};
  private initValues:any = {};
  private selectedLangages = [];
  private selectedFrameworks = [];
  private selectedContrats = [];
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,
      private provider: LynkProvider, public navParams: NavParams) {
    this.offre = this.navParams.get('offre');
    this.provider.getCompetenceInitValues().subscribe(
      res => {
        this.initValues = res;
        console.log('fff',this.initValues);
      }
    );
    console.log(this.offre);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditerOffrePage');
    console.log('/*_*/',this.offre);
    console.log('dd',this.initValues);
    this.offre.langages.map(el => {
      this.selectedLangages.push(el.id);
    });
    this.offre.frameworks.map(el => {
      this.selectedFrameworks.push(el.id);
    });
    this.offre.contrats.map(el => {
      if (el != null) {
        this.selectedContrats.push(el.id);
      }
    });
    this.content = this.offre.description;
    console.log(this.selectedLangages);
    console.log(this.selectedFrameworks);
    console.log(this.selectedContrats);
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
  }

  spinner = false;
  edit() {
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
  }

  selectLangage() {
    console.log(this.selectedLangages);
  }

  selectframework() {
    console.log(this.selectedFrameworks);
  }

  selectContrat() {
    console.log(this.selectedContrats);
  }

  closemodal() {
    this.navCtrl.pop();
  }

  getMessage(message: string) {
    this.content = message;
    console.log('dsdsd',this.content);
  }

}
