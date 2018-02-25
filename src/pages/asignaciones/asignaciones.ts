import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { DetallePage } from '../detalle/detalle';
import { OfertadasPage } from '../ofertadas/ofertadas';
import { UserService } from '../../services/user.services';
import { TransporteService } from '../../services/transporte.services';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'page-asignaciones',
  templateUrl: 'asignaciones.html',
})
export class AsignacionesPage {

  viajes: Observable<any>;
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
    this.viajes = transporteService.getOfertasAsignadas(this.localUser.uid);

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
