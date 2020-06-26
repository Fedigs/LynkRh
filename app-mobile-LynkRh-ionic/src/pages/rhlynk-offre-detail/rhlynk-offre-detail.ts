import { EditerOffrePage } from './../editer-offre/editer-offre';
import { CvAnonymesPage } from './../cv-anonymes/cv-anonymes';
import { LynkProvider } from './../../providers/lynk/lynk';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RhlynkOffreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rhlynk-offre-detail',
  templateUrl: 'rhlynk-offre-detail.html',
})
export class RhlynkOffreDetailPage {

  user = {
    name: 'Cosima Niehaus',
    profileImage: 'assets/img/avatar/girl-avatar.png',
    coverImage: 'assets/img/background/background-5.jpg',
    occupation: 'Designer',
    location: 'Seattle, WA',
    description: 'Passionate Designer. Recently focusing on developing mobile hybrid apps and web development.',
    address: '27 King\'s College Cir, Toronto, ON M5S, Canada',
    phone: '555 555 555',
    email: 'cosima@niehaus.com',
    whatsapp: '555 555 555',
  };

  private offre: any;
  private option: any = {};
  private page: any;
  private invitations: any;

  constructor(public navCtrl: NavController,
    public provider: LynkProvider,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
    this.offre = this.navParams.get('offre');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RhlynkOffreDetailPage');
    // console.log('offre',this.offre);
  }

  goToCvAnonymes() {
    this.navCtrl.push(CvAnonymesPage, { offre: this.offre });
  }

  goToEditerOffre() {
    let EditerOffreModal = this.modalCtrl.create(
      EditerOffrePage, { offre: this.offre },{ enableBackdropDismiss: true });
      EditerOffreModal.onDidDismiss(data => {
      console.log(data);
    });
    EditerOffreModal.present();
  }

}
