import { EntretienDefinitifPage } from './../entretien-definitif/entretien-definitif';
import { LynkProvider } from './../../providers/lynk/lynk';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { CvAnonymeDetailPage } from '../cv-anonyme-detail/cv-anonyme-detail';

/**
 * Generated class for the CvAnonymesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cv-anonymes',
  templateUrl: 'cv-anonymes.html',
})
export class CvAnonymesPage {

  private offre: any;
  private option: any = {};
  private page: any;
  private invitations: any;
  private noresult: boolean;
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public provider: LynkProvider,
    public navParams: NavParams) {
    this.offre = this.navParams.get('offre');
    this.option = { size:10,page:0,status:0,username:'',titre:'',date:'' };
    this.provider.getCvAnonyme(localStorage.getItem('username'),this.offre.id,10,0).subscribe(
      res => {
        console.log(res);
        this.invitations = res.content;
        if(this.invitations.length != 0) {
          this.noresult = false;
        } else {
          this.noresult = true;
        }
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CvAnonymesPage');
    console.log('offre',this.offre);
    this.provider.getCvAnonyme(localStorage.getItem('username'),this.offre.id,10,0).subscribe(
      res => {
        this.invitations = res.content;
        if(this.invitations.length != 0) {
          this.noresult = false;
        } else {
          this.noresult = true;
        }
        console.log(res);
      }
    );
  }


  presentProfileModal() {
    let profileModal = this.modalCtrl.create(CvAnonymeDetailPage, { userId: 8675309 });
    profileModal.present();
  }
  openCv(candidat) {
    let cvModal = this.modalCtrl.create(CvAnonymeDetailPage, { candidat: candidat },{ enableBackdropDismiss: true });
    cvModal.onDidDismiss(data => {
      console.log(data);
    });
    cvModal.present();
  }

  openInvitation(candidat,idOffre) {
    let invitationModal = this.modalCtrl.create(
      EntretienDefinitifPage, { candidat: candidat, idOffre: idOffre },{ enableBackdropDismiss: true });
    invitationModal.onDidDismiss(data => {
      console.log(data);
    });
    invitationModal.present();
  }

}
