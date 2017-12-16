import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { DetallePage } from '../detalle/detalle';
import { UserService } from '../../services/user.services';
import { TransporteService } from '../../services/transporte.services';

@Component({
  selector: 'page-publicadas',
  templateUrl: 'publicadas.html',
})
export class PublicadasPage {

  viajes: FirebaseListObservable<any>;
  userProfile:any;
  localUser:any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public userService: UserService,
    public transporteService: TransporteService,
    public database: AngularFireDatabase
  ){

    this.localUser = userService.getLocalUser();  
    this.userProfile = userService.getUserProfile();
    this.viajes = transporteService.getOfertasPublicadas(this.localUser.uid);
  }


  public goToDetail(viaje){
    this.navCtrl.push(DetallePage, {idViaje:viaje.$key});
  }

}
