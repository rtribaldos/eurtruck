import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats';
import { ProfilePage } from '../pages/profile/profile';
import { OfertasPage } from '../pages/ofertas/ofertas';
import { OfertadasPage } from '../pages/ofertadas/ofertadas';
import { PublicadasPage } from '../pages/publicadas/publicadas';
import { AsignacionesPage } from '../pages/asignaciones/asignaciones';
import { NuevoViajePage } from '../pages/nuevoViaje/nuevoViaje';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { DetallePage } from '../pages/detalle/detalle';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { Router } from '@angular/router';

import { AuthService } from '../providers/auth-service';
import { AuthProvider } from '../providers/auth-provider';

import { UserFilterPipe } from '../providers/userfilter';
import { GooglePlus } from 'ionic-native';

import { TransporteService } from '../services/transporte.services';
import { UserService } from '../services/user.services';
import { PujaService } from '../services/puja.services';

import { EmailComposer } from '@ionic-native/email-composer';

/*YOU HAVE TO PUT YOUR APIKEY FROM YOUR FIREBASE COUNT*/

export const firebaseConfig = {
    apiKey: "AIzaSyBZ_5K3u60uZNUBSNT_WscL1ivrtn8flj0",
    authDomain: "fir-eurtruck.firebaseapp.com",
    databaseURL: "https://fir-eurtruck.firebaseio.com",
    projectId: "firebase-eurtruck",
    storageBucket: "firebase-eurtruck.appspot.com",
    messagingSenderId: "634619610615"
};

@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    ProfilePage,
    OfertasPage,
    OfertadasPage,
    PublicadasPage,
    AsignacionesPage,
    NuevoViajePage,
    DetallePage,
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
    OfertadasPage,
    PublicadasPage,
    AsignacionesPage,
    NuevoViajePage,
    DetallePage,
    LoginPage,
    SignUpPage,
    TabsPage
  ],
  providers: [
    AuthService,
    AuthProvider,
    UserFilterPipe,
    StatusBar,
    SplashScreen,
    GooglePlus,
    EmailComposer,
    TransporteService, UserService, PujaService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
