import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';

@Injectable()
export class TransporteService{

  viajes: FirebaseListObservable<any>;

  constructor(public database: AngularFireDatabase) {
    this.viajes=this.database.list('/viajes');
  }

   public getViajes(){
    return this.viajes;
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
