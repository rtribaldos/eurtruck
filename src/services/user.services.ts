import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';

@Injectable()
export class UserService{


  userProfile: FirebaseObjectObservable<any>;
  localUser:any;

  constructor(public database: AngularFireDatabase) {
    this.localUser = JSON.parse(window.localStorage.getItem('user'));

    this.userProfile = this.database.object('/users/'+this.localUser.uid);
  }

   public getLocalUser(){
     console.log("User Id: " + this.localUser.uid + " " +
     this.userProfile);

     return this.localUser;
   }

   public getUserProfile(){
     return this.userProfile;
   }


 }
