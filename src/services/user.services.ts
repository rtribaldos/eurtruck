import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';

declare var FCMPlugin;

@Injectable()
export class UserService{

  userProfile: FirebaseObjectObservable<any>;
  localUser:any;

  constructor(public database: AngularFireDatabase, private platform: Platform) {
    this.localUser = JSON.parse(window.localStorage.getItem('user'));
    this.userProfile = this.getUserProfileById(this.localUser.uid);
    this.userProfile.update({ email: this.localUser.email });
    this.userProfile.update({ picture: this.localUser.picture });
    if (this.platform.is('cordova')) {
      this.tokensetup().then((token) => {
        this.userProfile.update({ notificationToken: token });
      });
    }
  }

   public getUserProfileById(id){
     return this.database.object('/users/'+id);
   }
   public getLocalUser(){
       return this.localUser;
   }

   public getUserProfile(){
     return this.userProfile;
   }

   tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
      resolve(token);
        }, (err) => {
        reject(err);
      });
    })
    return promise;
  }

 }
