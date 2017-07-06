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
import { UserFilterPipe } from '../providers/userfilter';

/*YOU HAVE TO PUT YOUR APIKEY FROM YOUR FIREBASE COUNT*/

export const firebaseConfig = {
    apiKey: "AIzaSyAAjsdBBz-cKodLpnraTApfJN2i92R4bBw",
    authDomain: "etrans-95c74.firebaseapp.com",
    databaseURL: "https://etrans-95c74.firebaseio.com",
    projectId: "etrans-95c74",
    storageBucket: "etrans-95c74.appspot.com",
    messagingSenderId: "507909632345"
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
    TabsPage,
    UserFilterPipe
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
    UserFilterPipe,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
