import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { OfertasPage } from '../ofertas/ofertas';
import { ITransporte } from '../../app/transporte';
 
@Component({
  selector: 'page-nuevoViaje',
  templateUrl: 'nuevoViaje.html'
})
export class NuevoViajePage {
 
    @ViewChild('signupSlider') signupSlider: any;
    viajes: FirebaseListObservable<any>;  
    viajeNuevo: ITransporte;      
    myForm: FormGroup;
    
 
    constructor(public navCtrl: NavController, public builder: FormBuilder, 
        public database: AngularFireDatabase) {
      this.viajes = this.database.list('/viajes');
      this.myForm = builder.group({
        'origen': ['',],
        'destino': ['',],
        'fechac':['',],
        'fechad':['',],
        'carga':['',],
        'mercancia':['',],
        'observaciones':['',],
        'especificaciones':['',],
        'codigoLavado':['',]
      })
    } 

    onSubmit(formData) {
      console.log('Form data is '  + formData.value.origen);
      this.viajes.push({
        destino: formData.value.destino,
        origen: formData.value.origen,
        carga: formData.value.carga,
        fechac: formData.value.fechac,
        fechad: formData.value.fechad,
        mercancia: formData.value.mercancia,
        observaciones: formData.value.observaciones,
        especificaciones: formData.value.especificaciones,
        codigoLavado: formData.value.codigoLavado,
        done: false
     });
     this.navCtrl.popTo(OfertasPage);
    }
 
}