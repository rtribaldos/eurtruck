import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ChatsPage } from '../chats/chats';
import { ProfilePage } from '../profile/profile';
import { OfertasPage } from '../ofertas/ofertas';
import { MyJobsPage } from '../myjobs/myjobs';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  @ViewChild('NAV') nav: Nav;
  public rootPage: any;
  public pages: Array<{ titulo: string, component: any, icon: string }>;

  constructor(
    platform:     Platform,
    statusBar:    StatusBar,
    splashScreen: SplashScreen
  ) {

    this.rootPage = OfertasPage;
    this.pages = [
      { titulo: 'Ofertas',  component: OfertasPage,   icon: 'home'},
      { titulo: 'Perfil',  component: ProfilePage,   icon: 'person'}
      
      
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToPage(page){
    this.nav.setRoot(page);
  }

}
