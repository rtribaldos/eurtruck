import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { OfertasPage } from '../ofertas/ofertas';

declare var google;
 
@Component({
  selector: 'page-nuevoViaje',
  templateUrl: 'nuevoViaje.html'
})
export class NuevoViajePage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    viajes: FirebaseListObservable<any>;  
    myForm: FormGroup;
    localUser: any; 
    
 
    constructor(public navCtrl: NavController, public builder: FormBuilder, 
        public database: AngularFireDatabase) {

      this.localUser= JSON.parse(window.localStorage.getItem('user'));
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
      console.log('User id '  +  this.localUser.uid);
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
        userId: this.localUser.uid,
        done: false
     });
     this.navCtrl.popTo(OfertasPage);
    }

    ionViewDidLoad(){
      this.loadMap();
    }
   
    loadMap(){
   
      let latLng = new google.maps.LatLng(-34.9290, 138.6010);
   
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
   
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   
    }
  
 
}