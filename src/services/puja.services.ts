import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';

@Injectable()
export class PujaService{

  constructor(public database: AngularFireDatabase) {

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
