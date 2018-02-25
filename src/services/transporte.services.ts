import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';
import { Observable, Subscriber } from 'rxjs';
import { Transporte } from '../app/transporte';


@Injectable()
export class TransporteService{

  viajes: any;
  viajesFiltrados: any;
  viaje: any;

  /// Active filter rules
 filters = {}

  constructor(public database: AngularFireDatabase) {
    this.viajes=this.database.list('/viajes',{
       query:{
         orderByChild: 'fechaOrden'
       }
     })
  }

public getViajesDisponibles(){
   let viajesFiltrados=[];
   this.viajes.subscribe(viajes => {
       viajes.forEach(viaje => {
         if(viaje.idTransportista==''){
           viajesFiltrados.push(viaje);
         }
       });
     });
     return  Observable.of(viajesFiltrados);
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
   let viajesFiltrados=[];
   this.viajes.subscribe(viajes => {
       viajes.forEach(viaje => {
         if(viaje.userId==id){
           viajesFiltrados.push(viaje);
         }
       });
     });
   return  Observable.of(viajesFiltrados);
}

 public getOfertasAsignadas(id){
   console.log('buscando ofertas asignadas para el user ' + id);
   let viajesFiltrados=[];
   this.viajes.subscribe(viajes => {
       viajes.forEach(viaje => {
         if(viaje.idTransportista==id){
           viajesFiltrados.push(viaje);
         }
       });
     });
   return  Observable.of(viajesFiltrados);
}

 removeViaje( viaje ){
   this.viajes.remove( viaje.$key );
 }

}
