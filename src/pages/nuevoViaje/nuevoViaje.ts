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
    autocompleteOrigen: any;
    autocompleteDestino: any;
    poly = new google.maps.Polyline({
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: this.map,
    });
    markerOrigen = new google.maps.Marker({
      map: this.map,
      label: 'O'
    });
  
    markerDestino = new google.maps.Marker({
      map: this.map,
      label: 'D'
    });
    
 
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
      var destinoVar = this.autocompleteDestino.getPlace().geometry.location.toJSON()
      destinoVar.formatted_address = this.autocompleteDestino.getPlace().formatted_address;
      destinoVar.name = this.autocompleteDestino.getPlace().name;
      var origenVar = this.autocompleteOrigen.getPlace().geometry.location.toJSON()
      origenVar.formatted_address = this.autocompleteOrigen.getPlace().formatted_address;
      origenVar.name = this.autocompleteOrigen.getPlace().name;
      this.viajes.push({
        destino: destinoVar,
        origen: origenVar,
        distancia: Math.round(google.maps.geometry.spherical.computeDistanceBetween(this.autocompleteOrigen.getPlace().geometry.location, this.autocompleteDestino.getPlace().geometry.location) / 1000),
        carga: formData.value.carga,
        fechac: formData.value.fechac,
        fechad: formData.value.fechad,
        mercancia: formData.value.mercancia,
        observaciones: formData.value.observaciones,
        especificaciones: formData.value.especificaciones,
        codigoLavado: formData.value.codigoLavado,
        idTransportista:'',
        userId: this.localUser.uid,
        done: false
     });
     this.navCtrl.popTo(OfertasPage);
    }

    ionViewDidLoad(){
      this.loadMap();
      var inputOrigen = document.getElementById('originText').getElementsByTagName('input')[0];
      var inputDestino = document.getElementById('destinyText').getElementsByTagName('input')[0];
      var options = {componentRestrictions: {country: 'es'}};
      this.autocompleteOrigen = new google.maps.places.Autocomplete(inputOrigen, options);
      this.autocompleteDestino = new google.maps.places.Autocomplete(inputDestino, options);
      this.autocompleteOrigen.addListener('place_changed', () => {
        var place = this.autocompleteOrigen.getPlace();
        if (place.geometry) {
          this.markerOrigen.setPosition(place.geometry.location);
          this.markerOrigen.setMap(this.map);
          if (this.autocompleteDestino.getPlace() && this.autocompleteDestino.getPlace().geometry) {
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(place.geometry.location);
            bounds.extend(this.autocompleteDestino.getPlace().geometry.location);
            this.map.fitBounds(bounds);
            var path = [place.geometry.location, this.autocompleteDestino.getPlace().geometry.location];
            this.poly.setPath(path);
            this.poly.setMap(this.map);
          } else {
            this.map.panTo(place.geometry.location);
            this.map.setZoom(15);
          }
        } else {
          document.getElementById('originText').getElementsByTagName('input')[0].placeholder = 'Enter a city';
        }
      });
      this.autocompleteDestino.addListener('place_changed', () => {
        var place = this.autocompleteDestino.getPlace();
        if (place.geometry) {
          this.markerDestino.setPosition(place.geometry.location);
          this.markerDestino.setMap(this.map);
          if (this.autocompleteOrigen.getPlace() && this.autocompleteOrigen.getPlace().geometry) {
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(place.geometry.location);
            bounds.extend(this.autocompleteOrigen.getPlace().geometry.location);
            this.map.fitBounds(bounds);
            var path = [place.geometry.location, this.autocompleteOrigen.getPlace().geometry.location];
            this.poly.setPath(path);
            this.poly.setMap(this.map);
          } else {
            this.map.panTo(place.geometry.location);
            this.map.setZoom(15);
          }
        } else {
          document.getElementById('destinyText').getElementsByTagName('input')[0].placeholder = 'Enter a city';
        }
      });
    }

    ngAfterViewInit() {
      
  }
   
    loadMap(){
   
      let latLng = new google.maps.LatLng(40.5, -3.7);
   
      let mapOptions = {
        center: latLng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false
      }
   
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   
    }
  
 
}
