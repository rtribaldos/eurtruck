import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ActionSheetController  } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';
import { List } from 'ionic-angular/components/list/list';
import { Puja } from '../../app/puja';
import { Transporte } from '../../app/transporte';
import { UserService } from '../../services/user.services';
import { PujaService } from '../../services/puja.services';
import { TransporteService } from '../../services/transporte.services';
import { DetallePage } from '../detalle/detalle';

@Component({
  selector: 'page-ofertadas',
  templateUrl: 'ofertadas.html',
})
export class OfertadasPage {

  ofertas: FirebaseListObservable<any>;
  userProfile:any;
  localUser:any;
  idViajeRec : any;
  sonOfertasDeMisViajes = false;
  transporte = new Transporte();
  transporteService : TransporteService;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public pujaService: PujaService,
    public userService: UserService,
    public transService : TransporteService,
    public actionSheetCtrl: ActionSheetController
  ){

    this.transporteService = transService;
    this.localUser = userService.getLocalUser();
    this.userProfile = userService.getUserProfile();
    this.idViajeRec=navParams.get('idViaje');

    console.log('idViaje: ' + this.idViajeRec);

    if(this.idViajeRec != null){
      this.ofertas = pujaService.getOfertasByViaje(this.idViajeRec);
      this.sonOfertasDeMisViajes = true;
    }else{
      this.ofertas = pujaService.getOfertas(this.localUser.uid);
    }
  }


  ionViewDidLoad() {
  }

  presentActionSheetDetalle(puja) {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Acciones',
     buttons: [
       {
         text: 'Detalle',
         handler: () => {
           this.navCtrl.push(DetallePage, {idViaje:puja.idViaje});
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


 presentActionSheetOfertas(puja) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Acciones',
    buttons: [
      {
        text: 'Detalle',
        handler: () => {
          this.navCtrl.push(DetallePage, {idViaje:puja.idViaje});
        }
      },{
        text: 'Asignar',
        handler: () => {
   //      this.navCtrl.push(OfertadasPage, {idViaje:viaje.$key});
          this.asignar(puja);
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


asignar(puja){
  let newTaskModal = this.alertCtrl.create({
    title: 'Asignar el transporte?',

    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Aceptar',
        handler: data => {
        //this.transporte = this.transporteService.getViaje(puja.idViaje);
        console.log('asignando el viaje ' + puja.idViaje);

          this.transporteService.asignaViaje(puja.idViaje, puja.idUsuario);
          console.log('asignada la carga ' + puja.idViaje);

        }
      }
    ]
  });
  newTaskModal.present( newTaskModal );
}



}
