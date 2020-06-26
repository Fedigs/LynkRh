import { TabsPage } from './../tabs/tabs';
import { LynkProvider } from './../../providers/lynk/lynk';
import { HomePage } from './../_home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, App } from 'ionic-angular';

/**
 * Generated class for the RhlynkLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rhlynk-login',
  templateUrl: 'rhlynk-login.html',
})
export class RhlynkLoginPage {
  public loginForm: any;
  public backgroundImage = 'assets/img/background/background-5.jpg';
  private credentials: Credentials= new Credentials();
  private auth:any = {};

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public provider: LynkProvider,
    public app: App
  ) { }

  login() {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    this.provider.login(this.credentials).subscribe(res => {
      if (res.login === true) {
        if (res.role !== 'CANDIDAT') {
          localStorage.setItem('username',res.username);
          this.navCtrl.setRoot(TabsPage);
        } else {
          this.auth.rep = -1;
          this.auth.message = `En tant que ${res.role} vous n'avez pas les autorisations d'accès cet espace`;
        }

      } else {
        this.auth.rep = false;
        this.auth.message = res;
      }

    },err => {
      console.log('errorr');

    });

    // loading.onDidDismiss(() => {
    //   const alert = this.alertCtrl.create({
    //     title: 'Logged in!',
    //     subTitle: 'Thanks for logging in.',
    //     buttons: ['Dismiss']
    //   });
    //   alert.present();
    // });

    // loading.present();

    // this.navCtrl.setRoot(HomePage);

  }

  goToSignup() {
    // this.navCtrl.push(SignupPage);
  }

  // Gradient logic from https://codepen.io/quasimondo/pen/lDdrF
  // NOTE: I'm not using this logic anymore, but if you want to use somehow, somewhere,
  // A programmatically way to make a nice rainbow effect, there you go.
  // NOTE: It probably won't work because it will crash your phone as this method is heavy \o/
  colors = new Array(
    [62, 35, 255],
    [60, 255, 60],
    [255, 35, 98],
    [45, 175, 230],
    [255, 0, 255],
    [255, 128, 0]);

  step = 0;
  // color table indices for:
  // [current color left,next color left,current color right,next color right]
  colorIndices = [0, 1, 2, 3];

  // transition speed
  gradientSpeed = 0.00005;
  gradient = '';

  updateGradient() {

    const c00 = this.colors[this.colorIndices[0]];
    const c01 = this.colors[this.colorIndices[1]];
    const c10 = this.colors[this.colorIndices[2]];
    const c11 = this.colors[this.colorIndices[3]];

    const istep = 1 - this.step;
    const r1 = Math.round(istep * c00[0] + this.step * c01[0]);
    const g1 = Math.round(istep * c00[1] + this.step * c01[1]);
    const b1 = Math.round(istep * c00[2] + this.step * c01[2]);
    const color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';

    const r2 = Math.round(istep * c10[0] + this.step * c11[0]);
    const g2 = Math.round(istep * c10[1] + this.step * c11[1]);
    const b2 = Math.round(istep * c10[2] + this.step * c11[2]);
    const color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';

    this.gradient = `-webkit-gradient(linear, left top, right bottom, from(${color1}), to(${color2}))`;
    this.step += this.gradientSpeed;
    if (this.step >= 1) {
      this.step %= 1;
      this.colorIndices[0] = this.colorIndices[1];
      this.colorIndices[2] = this.colorIndices[3];

      // pick two new target color indices
      // do not pick the same as the current one
      this.colorIndices[1] =
        (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

      this.colorIndices[3] =
        (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.colors.length - 1)))
        % this.colors.length;

    }

    setInterval(() => { this.updateGradient(); }, 40);
  }
}

export class Credentials{
  username:string;
  password:string;
}
