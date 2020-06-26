import { AjouterOffrePage } from './../ajouter-offre/ajouter-offre';
import { RhlynkOffreDetailPage } from './../rhlynk-offre-detail/rhlynk-offre-detail';
import { LynkProvider } from './../../providers/lynk/lynk';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EditerOffrePage } from '../editer-offre/editer-offre';

/**
 * Generated class for the RhlynkOffrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rhlynk-offre',
  templateUrl: 'rhlynk-offre.html',
})
export class RhlynkOffrePage {
  private option:any = { size:10,page:0,status:0,username:'',titre:'',date:'' };
  private offre: any = {langages:[],frameworks:[],contrats:[],test:{},titre:"",description:"",proprietaire:{}};
  public offres: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public provider: LynkProvider
            ) {
    if (localStorage.getItem('username') != 'admin') {
      this.option.username = localStorage.getItem('username');
    }
    // this.option.username = localStorage.getItem('username');
    this.provider.getOffres(this.option).subscribe(res => {
      console.log(res);
      this.offres = res.content;
      this.items = res.content;
      console.log(this.offres);
      this.offline = false;
    },(err) => {

      console.log(err);
      this.offline = true;
    });

  }

  ionViewWillEnter() {
    this.offres = [];
    this.option = { size:10,page:0,status:0,username:'',titre:'',date:'' };
    this.last = false;
    this.open = false;
    if (localStorage.getItem('username') != 'admin') {
      this.option.username = localStorage.getItem('username');
    }
    this.provider.getOffres(this.option).subscribe(res => {
      console.log('res',res);
      this.offres = res.content;
      this.offres1 = res.content;
      this.items = res.content;
      console.log(this.offres);
      this.offline = false;
    },(err) => {

      console.log(err);
      this.offline = true;
    });
    console.log('loaded offres---',this.offres);
    console.log('items/*_*/--',this.items);
  }

  ionViewDidLoad() {
    this.offres = [];
    if (localStorage.getItem('username') != 'admin') {
      this.option.username = localStorage.getItem('username');
    }
    this.provider.getOffres(this.option).subscribe(res => {
      console.log(res);
      this.offres = res.content;
      console.log(this.offres);
      this.offline = false;
    }
    ,(err) => {

      console.log(err);
      this.offline = true;
    });
    console.log('ionViewDidLoad RhlynkOffrePage');
  }

  openCreateOffre() {
    this.offre.langages = [];
    this.offre.frameworks = [];
    this.offre.contrats = [];
    this.offre.description = "";
    let AjouterOffreModal = this.modalCtrl.create(
      AjouterOffrePage, { offre: this.offre },{ enableBackdropDismiss: false });
    AjouterOffreModal.onDidDismiss(data => { console.log(data);
    });
    AjouterOffreModal.present();
    // this.navCtrl.push(AjouterOffrePage, { offre: this.offre });
  }

  last = false;
  offline = false;
  loadContents(event) {
    setTimeout(() =>{
      console.log('Loading contents started...');
      if (localStorage.getItem('username') != 'admin') {
        this.option.username = localStorage.getItem('username');
      }
      // this.option = { size:10,page:this.option.page,status:0,username:'',titre:'',date:'' };
      this.option.page++;
      if (!this.last) {
        this.provider.getOffres(this.option).subscribe(res => {
          console.log(res);
          this.last = res.last;
          if (res != null) {
            for (let offre of res.content) {
              this.offres.push(offre);
            }
            console.log(this.offres);
          } else {

            event.complete();
          }
        }
        ,(err) => {
          event.complete();
          console.log(err);
          this.offline = true;
        }
        );
      }
      console.log('last/*-*/',this.last);
      event.complete();
    }, 500);
  }
  offres1;
  initializeItems() {

    this.offres = this.offres1;

  }
 items;
  open = false;
  openSearch() {
    this.open = true;
  }

  closeSearch() {
    this.open = false;
  }

  dontref = true;
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();
    this.last = true;
    this.dontref = false;

    // // set val to the value of the searchbar
    let val = ev.target.value;

    // // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      console.log('445545',val);
      this.offres = this.offres.filter((offre) => {
        console.log(offre.titre);
        return(offre.titre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
    this.last = false;
    this.dontref = true;
  }

  goToOffreDetail(offre) {
    this.navCtrl.push(RhlynkOffreDetailPage, { offre: offre });
  }

}
