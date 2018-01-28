import { Component } from '@angular/core';
import { NavController, App, NavParams  } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ChatsPage } from '../chats/chats';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseObjectObservable, AngularFireDatabase  } from 'angularfire2/database';
import { UserService } from '../../services/user.services';


@Component({
  selector: 'page-contact',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  userProfile: any;
  soloLectura = false;

  constructor(public navCtrl: NavController,  public navParams: NavParams,   public userService: UserService, private app: App) {

    let idUser = navParams.get('idUsuario');
    if(idUser != null){
      this.userProfile = userService.getUserProfileById(idUser);
      this.soloLectura = true;
    }else{
      this.userProfile = userService.getUserProfile();
    }

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
