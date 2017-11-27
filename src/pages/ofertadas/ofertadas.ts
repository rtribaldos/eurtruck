import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, 
  FirebaseObjectObservable  } from 'angularfire2/database';
import { List } from 'ionic-angular/components/list/list';
import { Puja } from '../../app/puja';
import { Transporte } from '../../app/transporte';

@Component({
  selector: 'page-ofertadas',
  templateUrl: 'ofertadas.html',
})
export class OfertadasPage {

  ofertas: FirebaseListObservable<any>;
  viajes: FirebaseListObservable<any>;
  pujas: Puja[] = new Array();
  userProfile: FirebaseObjectObservable<any>;
  localUser:any;
  puja: Puja;
  transporte: Transporte;
  

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ){
    
    this.localUser = JSON.parse(window.localStorage.getItem('user'));
    this.userProfile = this.database.object('/users/'+this.localUser.uid);

    this.ofertas = this.database.list('/ofertas',{
      query:{
        orderByChild: 'idUsuario',
        equalTo: this.localUser.uid
      }
    });

   
    this.getPujas();
    
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OfertadasPage');
  }

  getPujas(){
   
    this.ofertas.forEach(i=>i.forEach(itemPuja=>(
      this.puja = new Puja(),
      this.puja.importe=itemPuja.importe,
      console.log('IdViaje:' + itemPuja.idViaje),
      this.viajes = this.database.list('/viajes',{
        query:{
            equalTo: itemPuja.idViaje,
            orderByKey: true
        }
        }),
        this.viajes.forEach(j=>j.forEach(itemViaje=>(
          console.log('Origen:' + itemViaje.origen),
          console.log('Destino:' + itemViaje.destino),
          this.transporte = new Transporte(),
          this.transporte.origen=itemViaje.origen,
          this.puja.viaje=this.transporte,
          this.pujas.push(this.puja)
          
        ))),
      
      
      console.log('Importe:' + this.puja.importe)
     // console.log('Origen:' + this.puja.viaje.origen)

    )));
  }

}
