import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { DetallePage } from '../detalle/detalle';
import { OfertadasPage } from '../ofertadas/ofertadas';
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
    public database: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController
  ){

    this.localUser = userService.getLocalUser();
    this.userProfile = userService.getUserProfile();
    this.viajes = transporteService.getOfertasPublicadas(this.localUser.uid);

  }

  presentActionSheet(viaje) {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Acciones',
     buttons: [
       {
         text: 'Detalle',
         handler: () => {
           this.navCtrl.push(DetallePage, {idViaje:viaje.$key});
         }
       },{
         text: 'Pujas',
         handler: () => {
          this.navCtrl.push(OfertadasPage, {idViaje:viaje.$key});
         }
       },{
         text: 'Cancelar',
         handler: () => {
           console.log('Cancelado');
         }
       }
     ]
   });

    actionSheet.present();
 }

}
