import { Injectable } from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase,
  FirebaseObjectObservable  } from 'angularfire2/database';


@Injectable()
export class UserService{

  userProfile: FirebaseObjectObservable<any>;
  localUser:any;

  constructor(public database: AngularFireDatabase) {
    this.localUser = JSON.parse(window.localStorage.getItem('user'));
    this.userProfile = this.getUserProfileById(this.localUser.uid);
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
