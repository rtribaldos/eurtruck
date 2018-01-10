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
import { ProfilePage } from '../profile/profile';

import { Observable, Subscriber } from 'rxjs';


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
  transporteService : TransporteService;

  pujitas: Observable<Puja[]>;

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

      this.pujitas = pujaService.getOfertasByViaje(this.idViajeRec);

      this.sonOfertasDeMisViajes = true;


    }else{
      this.ofertas = pujaService.getOfertas(this.localUser.uid);
      this.ofertas.forEach(element => {
           console.log(element);
       });

    }
  }


 getEmail(idUsuario){
   let usuarioOferta = this.userService.getUserProfileById(idUsuario);
   usuarioOferta.subscribe(usu => { return usu.email ;});

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
          text: 'Perfil del transportista',
          handler: () => {
            this.navCtrl.push(ProfilePage, {idUsuario:puja.idUsuario});
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
            this.asignar(puja);
        }
     },{
        text: 'Perfil del transportista',
        handler: () => {
          this.navCtrl.push(ProfilePage, {idUsuario:puja.idUsuario});
        }
      },
     {
        text: 'Cancelar',
        handler: () => {
          console.log('Cancelado');
        }
      }
    ]
  });
   actionSheet.present();
}


viewProfile(idProfile) {
  this.navCtrl.push(ProfilePage, {idUsuario:idProfile})
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
           this.transporteService.asignaViaje(puja.idViaje, puja.idUsuario);
        }
      }
    ]
  });
  newTaskModal.present( newTaskModal );
}

}
