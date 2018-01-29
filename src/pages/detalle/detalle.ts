import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams  } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';
import { List } from 'ionic-angular/components/list/list';
import { UserService } from '../../services/user.services';
import { TransporteService } from '../../services/transporte.services';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  viaje:any;
  userProfile: any;
  assignedProfile: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transporteService: TransporteService,
    public userService: UserService) {

    transporteService.getViaje(navParams.get('idViaje')).subscribe(trans => {
      this.viaje=trans;
      this.userProfile = userService.getUserProfileById(trans.userId);
      this.assignedProfile = userService.getUserProfileById(trans.idTransportista);
    });
  }

  ionViewDidLoad() {
//    console.log(this.viaje.origen);
  //    console.log('Carga ' + this.viaje.carga);
  }

  viewProfile(idProfile) {
    this.navCtrl.push(ProfilePage, {idUsuario:idProfile})
  }

}
