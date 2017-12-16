import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';

@Injectable()
export class TransporteService{

  viajes: FirebaseListObservable<any>;
  viaje: any;

  constructor(public database: AngularFireDatabase) {
    this.viajes=this.database.list('/viajes');
  }

   public getViajes(){
    return this.viajes;
   }

   public getViaje(id){
    console.log('buscando viaje: ' + id);
    this.viaje= this.database.object('viajes/' + id);

    this.viaje.subscribe(console.log);

    //console.log('carga: ' + this.viaje.carga);
     return this.viaje;
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
