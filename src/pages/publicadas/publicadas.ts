import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-publicadas',
  templateUrl: 'publicadas.html',
})
export class PublicadasPage {

  viajes: FirebaseListObservable<any>;
  userProfile: FirebaseObjectObservable<any>;
  localUser:any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public database: AngularFireDatabase
  ){
    
    this.localUser = JSON.parse(window.localStorage.getItem('user'));
    this.userProfile = this.database.object('/users/'+this.localUser.uid);

    this.viajes = this.database.list('/viajes',{
      query:{
        orderByChild: 'userId',
        equalTo: this.localUser.uid
      }
    }
  );
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OfertadasPage');
  }

}
