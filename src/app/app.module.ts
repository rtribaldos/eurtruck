import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats';
import { ProfilePage } from '../pages/profile/profile';
import { OfertasPage } from '../pages/ofertas/ofertas';
import { NuevoViajePage } from '../pages/nuevoViaje/nuevoViaje';
import { TabsPage } from '../pages/tabs/tabs';
import { MyJobsPage } from '../pages/myjobs/myjobs';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { Router } from '@angular/router';

import { AuthService } from '../providers/auth-service';

/*YOU HAVE TO PUT YOUR APIKEY FROM YOUR FIREBASE COUNT*/

export const firebaseConfig = {
    apiKey: "AIzaSyDk7IOVZ-c3C_fa4udSSzelJded1ylKios",
    authDomain: "etransport-5e753.firebaseapp.com",
    databaseURL: "https://etransport-5e753.firebaseio.com",
    projectId: "etransport-5e753",
    storageBucket: "etransport-5e753.appspot.com",
    messagingSenderId: "688102504376"
};

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    ProfilePage,
    OfertasPage,
    NuevoViajePage,
    MyJobsPage,
    LoginPage,
    SignUpPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    ProfilePage,
    OfertasPage,
    MyJobsPage,
    NuevoViajePage,
    LoginPage,
    SignUpPage,
    TabsPage
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
