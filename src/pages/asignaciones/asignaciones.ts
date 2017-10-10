import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, 
  FirebaseObjectObservable  } from 'angularfire2/database';

@Component({
  selector: 'page-asignaciones',
  templateUrl: 'asignaciones.html',
})
export class AsignacionesPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsignacionesPage');
  }

}
