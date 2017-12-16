import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams  } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';
import { List } from 'ionic-angular/components/list/list';
import { Puja } from '../../app/puja';
import { Transporte } from '../../app/transporte';
import { UserService } from '../../services/user.services';
import { TransporteService } from '../../services/transporte.services';

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
  puja:any;
  viaje= new Transporte();

  constructor(public navCtrl: NavController, public navParams: NavParams, public transporteService: TransporteService) {
    this.puja = navParams.get('puja');
    transporteService.getViaje(this.puja.idViaje).subscribe(trans => {this.viaje=trans});
  }

  ionViewDidLoad() {
//    console.log(this.viaje.origen);
      console.log('Carga ' + this.viaje.carga);
  }

}
