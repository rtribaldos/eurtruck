import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';

@Injectable()
export class UserService{

  userProfile: FirebaseObjectObservable<any>;
  localUser:any;

  constructor(public database: AngularFireDatabase, private platform: Platform, private firebase: Firebase) {
    this.localUser = JSON.parse(window.localStorage.getItem('user'));
    this.userProfile = this.getUserProfileById(this.localUser.uid);
    this.userProfile.update({ email: this.localUser.email });
    this.userProfile.update({ picture: this.localUser.picture });
    if (this.platform.is('cordova')) {
      this.firebase.getToken()
        .then(token => this.userProfile.update({ notificationToken: token })) // save the token server-side and use it to push notifications to this device
        .catch(error => console.error('Error getting token', error));

      this.firebase.onTokenRefresh()
        .subscribe((token: string) => this.userProfile.update({ notificationToken: token }));
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

 }
