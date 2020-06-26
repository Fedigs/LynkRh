import { SettingPage } from './../setting/setting';
import { RhlynkLoginPage } from './../rhlynk-login/rhlynk-login';
import { RhlynkOffrePage } from './../rhlynk-offre/rhlynk-offre';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../_home/home';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  homeRoot = HomePage;
  offresRoot = RhlynkOffrePage;
  settingRoot =  SettingPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
