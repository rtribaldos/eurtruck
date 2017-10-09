import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ChatsPage } from '../chats/chats';
import { ProfilePage } from '../profile/profile';
import { OfertasPage } from '../ofertas/ofertas';
import { OfertadasPage } from '../ofertadas/ofertadas';
import { PublicadasPage } from '../publicadas/publicadas';
import { MyJobsPage } from '../myjobs/myjobs';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  @ViewChild('NAV') nav: Nav;
  public rootPage: any;
  public pages: Array<{ titulo: string, component: any, icon: string }>;
  public others: Array<{ titulo: string, component: any, icon: string }>

  constructor(
    platform:     Platform,
    statusBar:    StatusBar,
    splashScreen: SplashScreen
  ) {

    this.rootPage = OfertasPage;
    this.pages = [
      { titulo: 'Disponibles',  component: OfertasPage,   icon: 'paper'},
      { titulo: 'Pujadas',  component: OfertadasPage, icon: 'send'},
      { titulo: 'Publicadas',  component: PublicadasPage,   icon: 'megaphone'}
    ];
    this.others = [
      { titulo: 'Perfil',  component: ProfilePage,   icon: 'contact'}
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
