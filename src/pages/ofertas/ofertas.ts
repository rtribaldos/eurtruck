import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { NuevoViajePage } from '../nuevoViaje/nuevoViaje';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'ofertas.html'
})
export class OfertasPage {

  tasks: FirebaseListObservable<any>;
  viajes: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ) {
    
    this.viajes = this.database.list('/viajes');
  }
  
  creaViaje(){
     this.navCtrl.push(NuevoViajePage);
  } 
 
  createViaje(){
    let newTaskModal = this.alertCtrl.create({
      title: 'Oferta de transporte',
      inputs: [
         {
          name: 'destino',
          placeholder: 'Introduzca destino'
        },
        {
          name: 'origen',
          placeholder: 'Introduzca origen'
        },
         {
          name: 'fechac',
          placeholder: 'Fecha de carga'
        },
         {
          name: 'fechad',
          placeholder: 'Fecha de descarga'
        },
        {
          name: 'mercancia',
          placeholder: 'Mercancía'
        },
        {
          name: 'especificaciones',
          placeholder: 'Especificaciones Lavados'
        },
        {
          name: 'codigoLavado',
          placeholder: 'Código de Lavado'
        },
        {
          name: 'prohibidos',
          placeholder: 'Productos prohibidos'
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
          text: 'Save',
          handler: data => {
            this.viajes.push({
              destino: data.destino,
              origen: data.origen,
              fechac: data.fechac,
              fechad: data.fechad,
              mercancia: data.mercancia,
              especificaciones: data.especificaciones,
              codigoLavado: data.codigoLavado,
              prohibidos: data.prohibidos,
              observaciones: data.observaciones,
              done: false
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