import { Component, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LynkProvider } from '../../providers/lynk/lynk';

/**
 * Generated class for the EntretienDefinitifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entretien-definitif',
  templateUrl: 'entretien-definitif.html',
})
export class EntretienDefinitifPage {
  public event = {
    month: '2018-02-20',
    timeStarts: '07:43',
    timeEnds: '2050-02-20'
  };
  locationfinal;
  locations;
  date;
  idOffre;
  candidat;
  entretien;

  content;
  spinner = false;
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,
     public provider: LynkProvider, public navParams: NavParams) {
    this.idOffre = this.navParams.get('idOffre');
    this.candidat = this.navParams.get('candidat');
    console.log(this.event.month);
    this.provider.getLieux().subscribe(
      res => {
        console.log(res);
        this.locations = res;
      }
    );
    this.entretien = {
      message: 'Bonjour, vous etes inviter pour un entretien definitif',
      candidat: {},
      invite: false,
      offre: {},
      date: this.date
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntretienDefinitifPage');
    console.log(this.event.month + "");
  }

  closemodal() {
    this.navCtrl.pop();
  }

  inviterEntretienDefinitif() {
    this.spinner = true;
    setTimeout(()=>{
      let sucess = this.toastCtrl.create({
        message: 'Invitation envoyer avec Success',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'close'
      });
      let error = this.toastCtrl.create({
        message: 'Invitation envoyer avec Echec',
        duration: 3000,
        showCloseButton: true,
        closeButtonText: 'close'
      });
      this.entretien.message = this.content;
      console.log(this.candidat.username);
      console.log(this.locationfinal);
      console.log(this.entretien.message);
      console.log(this.event.month);
      this.provider.inviterEntretienDefinitif(this.candidat.username,
        this.entretien,this.event.month + '',this.locationfinal,this.idOffre)
      .subscribe(res => {
        console.log(res);
        sucess.present();
        this.spinner = false;
      },
      err => {
        console.log(err);
        error.present();
        this.spinner = false;
      });
    },1000);
  }

  getMessage(message: string) {
    this.content = message;
    this.entretien.message = message;
    console.log('dsdsd',this.content);
  }

  onChange(newval) {
    console.log(newval);
    this.locationfinal = newval;
  }

}

@Component({
  selector: 'elastic-textarea',
  inputs: ['placeholder', 'lineHeight'],
  template:
  `
  <ion-textarea #ionTxtArea
    placeholder='{{placeholder}}'
    [(ngModel)]="contents"
    (ngModelChange)='onChange($event)'></ion-textarea>
  `,
  queries: {
    ionTxtArea: new ViewChild('ionTxtArea')
  }
})
export class ElasticTextarea {
  @Output() content: EventEmitter<string> = new EventEmitter<string>();
  @Input() contents;
  lineHeight;
  txtArea;
  ionTxtArea;
  placeholder = "hello";

  constructor() {
    // this.content = "";
    this.lineHeight = "22px";
  }

  ngAfterViewInit(){
    this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
    this.txtArea.style.height = this.lineHeight + "px";
    console.log(this.placeholder);
    console.log(this.content);
    this.contents;
  }

  onChange(newValue){
    this.txtArea.style.height = this.lineHeight + "px";
    this.txtArea.style.height =  this.txtArea.scrollHeight + "px";
    // console.log(this.content);
    this.content.emit(this.contents);
  }
}
