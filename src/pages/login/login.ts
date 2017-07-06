import { Component, ElementRef, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../signup/signup';
import { AuthProvider } from '../../providers/auth-provider';
import { Platform } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
import { auth } from 'firebase'; //needed for the GoogleAuthProvider

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{
	root:any;
  splash = true;
  secondPage = LoginPage;

  constructor(public navCtrl: NavController,public af: AngularFire, private platform: Platform, public element: ElementRef, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  	window.localStorage.removeItem('user');
  	this.element.nativeElement
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.splash = false;
    }, 4000);
  }

 ngOnInit(){
 	this.root = this.element.nativeElement;
 }

 onClick(){
 	console.log('logging in with email and password');
 	let self = this;
 	let email:string = this.root.querySelector('#email').value;
 	let password:string = this.root.querySelector('#password').value;
 	this.af.auth.login({
 		email: email,
 		password: password
 	},{
		provider: AuthProviders.Password,
 		method: AuthMethods.Password,
 	}).then(function(response){
     self.loadingCtrl.create({
        content: '<ion-spinner name="crescent"></ion-spinner> Please wait...',
        duration: 8000,
        dismissOnPageChange: true
      }).present();
 		self.navCtrl.push(TabsPage);
 	}).catch(function(error){
     self.alertCtrl.create({
        title: 'Login failed',
        subTitle: 'Email or Password is incorrect',
        buttons: ['Ok']
      }).present();
 		console.log('error');
 	});
 }

 onTwitterLogin(){
    let self = this;
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup
    }).then(function(response){
      let user = {
        email:response.auth.email,
        picture:response.auth.photoURL
      };
      window.localStorage.setItem('user',JSON.stringify(user));
      self.navCtrl.push(TabsPage);
    }).catch(function(error){
      console.log(error);
    });
  }

  /*onFacebookLogin(){
    let self = this;
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then(function(response){
      let user = {
        email:response.auth.email,
        picture:response.auth.photoURL
      };
      window.localStorage.setItem('user',JSON.stringify(user));
      self.navCtrl.push(TabsPage);
    }).catch(function(error){
      console.log(error);
    });
  }*/

  onFacebookLogin() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }).then((response) => {
      console.log('Login success with facebook' + JSON.stringify(response));
      let currentuser = {
          email: response.auth.displayName,
          picture: response.auth.photoURL
        };
        window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
        this.navCtrl.push(TabsPage);
      }).catch((error) => {
        console.log(error);
    })
  }

   onGoogleLogin(){
    let self = this;
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(function(response){
      let user = {
        email:response.auth.email,
        picture:response.auth.photoURL,
        uid:response.auth.uid
      };
      window.localStorage.setItem('user',JSON.stringify(user));
      self.navCtrl.push(TabsPage);
    }).catch(function(error){
      console.log(error);
    });
  }

  /**loginWithGoogle(): void{
    let self = this;
    this.auth.loginWithGoogle().subscribe((response) => {
      console.log(response);
      let user = {
        email:response.auth.email,
        picture:response.auth.photoURL,
        uid:response.auth.uid
      };
      window.localStorage.setItem('user',JSON.stringify(user));
      self.navCtrl.push(TabsPage);
    }, err => {
      console.log(err);
    });
  }*/

  loginWithGoogle2(){
    let self = this;

    if (this.platform.is('cordova')) {
       return GooglePlus.login({
          'webClientId':'507909632345-29bbek30kiqfm0j6c1ggpv7cpinrqtae.apps.googleusercontent.com' //your Android reverse client id
        }).then(userData => {
          var token = userData.idToken;
          let user = {
            email:userData.email,
            picture:userData.imageUrl,
            uid:userData.userId
          };
          window.localStorage.setItem('user',JSON.stringify(user));
          self.navCtrl.push(TabsPage);
        }).catch(error => {
            console.log(error);
            //observer.error(error);
        });
      } else {
        this.af.auth.login({
          provider: AuthProviders.Google,
          method: AuthMethods.Popup
        }).then(function(response){
          let user = {
            email:response.auth.email,
            picture:response.auth.photoURL,
            uid:response.auth.uid
          };
          window.localStorage.setItem('user',JSON.stringify(user));
          self.navCtrl.push(TabsPage);
        }).catch(function(error){
          console.log(error);
        });
      }

  }

 public goSignUp() {
   	this.navCtrl.push(SignUpPage);
  }

}
