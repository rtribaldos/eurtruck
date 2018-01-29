import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AsignacionesPage } from './asignaciones';

@NgModule({
  declarations: [
    AsignacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(AsignacionesPage),
  ],
})
export class AsignacionesPageModule {}
