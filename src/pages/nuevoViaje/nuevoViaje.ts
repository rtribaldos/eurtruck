import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import { OfertasPage } from '../ofertas/ofertas';
import { TransporteService } from '../../services/transporte.services';
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
        public transporteService: TransporteService ) {

      this.localUser= JSON.parse(window.localStorage.getItem('user'));
      this.viajes = transporteService.getViajes();
      this.myForm = builder.group({
        'origen': ['', Validators.required],
        'destino': ['', Validators.required],
        'fechac':['', Validators.required],
        'fechad':['', Validators.required],
        'carga':['', Validators.required],
        'mercancia':['', Validators.required],
        'observaciones':['',],
        'especificaciones':['',],
        'codigoLavado':['',]
      })
    }

    onSubmit(formData) {
      console.log('User id '  +  this.localUser.uid);
      let ahora:any = new Date();
      let dateOrigen:any =  new Date(0);

      let fechaEnMilis:number = ahora - dateOrigen;

      var destinoVar = this.autocompleteDestino.getPlace().geometry.location.toJSON()
      destinoVar.formatted_address = this.autocompleteDestino.getPlace().formatted_address;
      destinoVar.name = this.autocompleteDestino.getPlace().name;


      var arrayLength = this.autocompleteDestino.getPlace().address_components.length;
      for (var i = 0; i < arrayLength; i++) {
        if (this.autocompleteDestino.getPlace().address_components[i].types[0] === 'postal_code') {
          destinoVar.postal_code = this.autocompleteDestino.getPlace().address_components[i].long_name;
        }
        if (this.autocompleteDestino.getPlace().address_components[i].types[0] === 'country') {
          destinoVar.pais = this.autocompleteDestino.getPlace().address_components[i].long_name;
        }
        if (this.autocompleteDestino.getPlace().address_components[i].types[0] === 'administrative_area_level_1') {
          destinoVar.comunidad = this.autocompleteDestino.getPlace().address_components[i].long_name;
        }
        if (this.autocompleteDestino.getPlace().address_components[i].types[0] === 'administrative_area_level_2') {
          destinoVar.provincia = this.autocompleteDestino.getPlace().address_components[i].long_name;
        }
        if (this.autocompleteDestino.getPlace().address_components[i].types[0] === 'locality') {
          destinoVar.localidad = this.autocompleteDestino.getPlace().address_components[i].long_name;
        }
      }

      var origenVar = this.autocompleteOrigen.getPlace().geometry.location.toJSON()
      origenVar.formatted_address = this.autocompleteOrigen.getPlace().formatted_address;
      origenVar.name = this.autocompleteOrigen.getPlace().name;

      arrayLength = this.autocompleteOrigen.getPlace().address_components.length;
      for (var i = 0; i < arrayLength; i++) {
        if (this.autocompleteOrigen.getPlace().address_components[i].types[0] === 'postal_code') {
          origenVar.postal_code = this.autocompleteOrigen.getPlace().address_components[i].long_name;
        }
        if (this.autocompleteOrigen.getPlace().address_components[i].types[0] === 'country') {
          origenVar.pais = this.autocompleteOrigen.getPlace().address_components[i].long_name;
        }
        if (this.autocompleteOrigen.getPlace().address_components[i].types[0] === 'administrative_area_level_1') {
          origenVar.comunidad = this.autocompleteOrigen.getPlace().address_components[i].long_name;
        }
        if (this.autocompleteOrigen.getPlace().address_components[i].types[0] === 'administrative_area_level_2') {
          origenVar.provincia = this.autocompleteOrigen.getPlace().address_components[i].long_name;
        }
        if (this.autocompleteOrigen.getPlace().address_components[i].types[0] === 'locality') {
          origenVar.localidad = this.autocompleteOrigen.getPlace().address_components[i].long_name;
        }
      }

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
        done: false,
        fechaCreacion: fechaEnMilis,
        fechaOrden: (-1 * fechaEnMilis)
     });
     this.navCtrl.setRoot(OfertasPage);
    }



    ionViewDidLoad(){
      this.loadMap();

      var inputOrigen = document.getElementById('origen').getElementsByTagName('input')[0];
      var inputDestino = document.getElementById('destino').getElementsByTagName('input')[0];
      var options = {componentRestrictions: {country: ["fr","es","ad","pt","it"]}};
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
          document.getElementById('destino').getElementsByTagName('input')[0].placeholder = 'Introduzca una ciudad';
        }
      });

    }

    ngAfterViewInit() {}

    loadMap(){

      let latLng = new google.maps.LatLng(40.5, -3.7);

      let mapOptions = {
        center: latLng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        streetViewControl: false,
        fullscreenControl: false
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }


}
