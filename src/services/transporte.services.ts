import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';

@Injectable()
export class TransporteService{

  viajes: FirebaseListObservable<any>;
  viaje: any;

  constructor(public database: AngularFireDatabase) {
    this.viajes=this.database.list('/viajes',{
       query:{
         orderByChild: 'idTransportista',
         equalTo: ''
       }
     });
  }

   public getViajes(){
    return this.viajes;
   }

   public getViaje(id){
    //console.log('buscando viaje: ' + id);
    this.viaje= this.database.object('viajes/' + id);
  //  this.viaje.subscribe(console.log);
     return this.viaje;
  }

   updateViaje(viaje){
     this.viajes.update( viaje.$key,{
       destino: viaje.destino,
       done: !viaje.done
     });
   }

   asignaViaje(idViaje, idUsuario){
     console.log('actualizando el viaje ' +idViaje + ', transportista ' + idUsuario);
     this.viajes.update(idViaje,{
       idTransportista: idUsuario
     });
   }

   public getOfertasPublicadas(id){
     console.log('buscando ofertas para el user ' + id);
     return this.database.list('/viajes',{
       query:{
         orderByChild: 'userId',
         equalTo: id
       }
     });
   }

   public getOfertasAsignadas(id){
     console.log('buscando ofertas asignadas para el user ' + id);
     return this.database.list('/viajes',{
       query:{
         orderByChild: 'idTransportista',
         equalTo: id
       }
     });
   }




   removeViaje( viaje ){
     this.viajes.remove( viaje.$key );
   }

 }
