import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { ChatsPage } from '../chats/chats';
import { ProfilePage } from '../profile/profile';
import { OfertasPage } from '../ofertas/ofertas';
import { OfertadasPage } from '../ofertadas/ofertadas';
import { PublicadasPage } from '../publicadas/publicadas';
import { AsignacionesPage } from '../asignaciones/asignaciones';
import { MyJobsPage } from '../myjobs/myjobs';
import { UserService } from '../../services/user.services';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  userProfile: any;


  @ViewChild('NAV') nav: Nav;
  public rootPage: any;
  public pages: Array<{ titulo: string, component: any, icon: string }>;
  public others: Array<{ titulo: string, component: any, icon: string }>

  constructor(
    platform:     Platform,
    statusBar:    StatusBar,
    splashScreen: SplashScreen,
    public userService: UserService
  ) {

    userService.getUserProfile().subscribe((result) => {
      this.userProfile = result;
      if (this.userProfile.validated) {
        this.rootPage = OfertasPage;
        this.pages = [
          { titulo: 'Disponibles',  component: OfertasPage,   icon: 'paper'},
          { titulo: 'Mis pujas',  component: OfertadasPage, icon: 'send'},
          { titulo: 'Publicadas por mi',  component: PublicadasPage,   icon: 'megaphone'},
          { titulo: 'Asignadas a mi',  component: AsignacionesPage,   icon: 'thumbs-up'}
        ];
      } else {
        this.rootPage = ProfilePage;
      }
      this.others = [
        { titulo: 'Perfil',  component: ProfilePage,   icon: 'contact'}
      ];
  
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
      });
  });

    
  }

  goToPage(page){
    this.nav.setRoot(page);
  }

}
