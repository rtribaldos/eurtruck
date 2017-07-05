import { Component } from '@angular/core';

import { ChatsPage } from '../chats/chats';
import { ProfilePage } from '../profile/profile';
import { OfertasPage } from '../ofertas/ofertas';
import { MyJobsPage } from '../myjobs/myjobs';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = OfertasPage;
  tab2Root = ChatsPage;
  tab3Root = ProfilePage;
  tab4Root = MyJobsPage;

  constructor() {

  }
}
