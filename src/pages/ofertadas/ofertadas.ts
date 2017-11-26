import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, 
  FirebaseObjectObservable  } from 'angularfire2/database';


@Component({
  selector: 'page-ofertadas',
  templateUrl: 'ofertadas.html',
})
export class OfertadasPage {

  ofertas: FirebaseListObservable<any>;
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

    

    this.ofertas.forEach(i=>i.forEach(itemPuja=>(
      this.puja = new Puja(),
      this.puja.importe=itemPuja.importe,
      console.log(this.puja.importe)
      
    )));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OfertadasPage');
  }

}
