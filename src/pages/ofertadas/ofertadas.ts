import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';
import { List } from 'ionic-angular/components/list/list';
import { Puja } from '../../app/puja';
import { Transporte } from '../../app/transporte';
import { UserService } from '../../services/user.services';
import { PujaService } from '../../services/puja.services';
import { DetallePage } from '../detalle/detalle';

@Component({
  selector: 'page-ofertadas',
  templateUrl: 'ofertadas.html',
})
export class OfertadasPage {

  ofertas: FirebaseListObservable<any>;
  userProfile:any;
  localUser:any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public pujaService: PujaService,
    public userService: UserService
  ){

    this.localUser = userService.getLocalUser;
    this.userProfile = userService.getUserProfile;
    this.ofertas = pujaService.getOfertas(this.localUser.uid);

  }


  ionViewDidLoad() {
  }

  public goToDetail(puja){
    this.navCtrl.push(DetallePage, {puja:puja});
  }


}
