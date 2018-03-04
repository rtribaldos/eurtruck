import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { NuevoViajePage } from '../nuevoViaje/nuevoViaje';
import { DetallePage } from '../detalle/detalle';
import { UserService } from '../../services/user.services';
import { TransporteService } from '../../services/transporte.services';
import { PujaService } from '../../services/puja.services';
import { Observable, Subscriber } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'ofertas.html'
})
export class OfertasPage{

  viajes: Observable<any>;
  ofertas: FirebaseListObservable<any>;
  userProfile: any;
  localUser:any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public transporteService: TransporteService,
    public pujaService: PujaService,
    public userService: UserService
  ) {

    this.localUser = userService.getLocalUser();
    this.userProfile = userService.getUserProfile();


    //this.ofertas = pujaService.getTotalOfertas();
  }

  ionViewDidLoad() {
      this.viajes =  this.transporteService.getViajesDisponibles();
  }

  creaViaje(){
    this.navCtrl.push(NuevoViajePage);
   }

  viewDetails(idViaje) {
    this.navCtrl.push(DetallePage, {idViaje:idViaje});
  }

  ofertar(viaje){
    let newTaskModal = this.alertCtrl.create({
      title: 'Oferta de transporte',
      inputs: [
         {
          name: 'importe',
          placeholder: 'Introduzca importe'
        },
        {
          name: 'observaciones',
          placeholder: 'Observaciones'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ofertar',
          handler: data => {

              this.ofertas.push({
              idViaje: viaje.$key,
              importe: data.importe,
              idUsuario:this.localUser.uid,
              anulada: false,
              fecha:new Date(),
              resumen: 'De ' + viaje.origen.formatted_address + ' a ' + viaje.destino.formatted_address
            });
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }
}
