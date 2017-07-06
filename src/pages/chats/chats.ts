import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import {UserFilterPipe} from '../../providers/userfilter'

import { AngularFire, AngularFireModule, FirebaseListObservable, AuthProviders, AuthMethods, AngularFireDatabase } from 'angularfire2';

@Component({
  selector: 'page-about',
  templateUrl: 'chats.html',
  providers: [UserFilterPipe]
})
export class ChatsPage {

  users: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public database: AngularFireDatabase, private app: App) {
    this.users = this.database.list('/users');
  }

  validateUser(user) {
    console.log(user);
    user.validated=true;
    this.users.update(user.$key, {validated: true});
  }

  invalidateUser(user) {
    console.log(user);
    user.validated=false;
    this.users.update(user.$key, {validated: false});
  }

}
