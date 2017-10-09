import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PublicadasPage } from './publicadas';

@NgModule({
  declarations: [
    PublicadasPage,
  ],
  imports: [
    IonicPageModule.forChild(PublicadasPage),
  ],
})
export class PublicadasPageModule {}
