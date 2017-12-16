import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';

@Injectable()
export class PujaService{

  ofertas: FirebaseListObservable<any>;
  constructor(public database: AngularFireDatabase) {
    this.ofertas=this.database.list('/ofertas');
  }

  public getTotalOfertas(){
    return this.ofertas;
  }

   public getOfertas(idUser){
    return this.database.list('/ofertas',{
       query:{
         orderByChild: 'idUsuario',
         equalTo: idUser
       }
     });
  }



 }
