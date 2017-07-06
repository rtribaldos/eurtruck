import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ChatsPage } from '../chats/chats';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseObjectObservable, AngularFireDatabase  } from 'angularfire2/database';


@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  userProfile: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public database: AngularFireDatabase, private app: App) {
    let localUser = JSON.parse(window.localStorage.getItem('user'));
    this.userProfile = this.database.object('/users/'+localUser.uid);
    this.userProfile.update({ email: localUser.email });
    this.userProfile.update({ picture: localUser.picture });
  }

  logout(){
	//clear any cached data
	this.app.getRootNav().setRoot(LoginPage);
  }

  changeEmpresa(data){
    this.userProfile.update({ [data.name]: data.value});
  }

  adminPage(){
     this.navCtrl.push(ChatsPage);
  } 

}
