import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { NuevoViajePage } from '../nuevoViaje/nuevoViaje';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'ofertas.html'
})
export class OfertasPage {

  tasks: FirebaseListObservable<any>;
  viajes: FirebaseListObservable<any>;
  ofertas: FirebaseListObservable<any>;

  userProfile: FirebaseObjectObservable<any>;
  localUser:any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    
    this.viajes = this.database.list('/viajes');
    this.ofertas = this.database.list('/ofertas');

    this.localUser = JSON.parse(window.localStorage.getItem('user'));
    this.userProfile = this.database.object('/users/'+this.localUser.uid);
    
  }
  
  creaViaje(){
     this.navCtrl.push(NuevoViajePage);
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
              idUsuario:this.localUser.uid
            });
          }
        }
      ]
    });
    newTaskModal.present( newTaskModal );
  }

  updateViaje( viaje){
    this.viajes.update( viaje.$key,{
      destino: viaje.destino,
      done: !viaje.done
    });
  }

  removeViaje( viaje ){
    this.viajes.remove( viaje.$key );
  }
}