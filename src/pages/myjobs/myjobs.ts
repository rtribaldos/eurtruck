import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { OfertasPage } from '../ofertas/ofertas';
 
@Component({
 selector: 'page-myjobs',
  templateUrl: 'myjobs.html'
})
export class MyJobsPage {
 
    @ViewChild('signupSlider') signupSlider: any;
    viajes: FirebaseListObservable<any>;  
    userProfile: FirebaseObjectObservable<any>;
 
    slideOneForm: FormGroup;
    slideTwoForm: FormGroup;
 
    submitAttempt: boolean = false;
 
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, 
        public database: AngularFireDatabase) {

      this.viajes = this.database.list('/viajes');
      let localUser = JSON.parse(window.localStorage.getItem('user'));
      this.userProfile = this.database.object('/users/'+localUser.uid);
      
      this.slideOneForm = formBuilder.group({
          destino: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          carga:['',],
          fechac:['',],
          fechad:['',],
          mercancia:['',]
      });
 
      this.slideTwoForm = formBuilder.group({
            origen: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            observaciones:['',],
            especificaciones:['',],
            codigoLavado:['',]
      });

    }
 
    next(){
        this.signupSlider.slideNext();
    }
 
    prev(){
        this.signupSlider.slidePrev();
    }
 
  save(){
    
    this.viajes.push({
        destino: this.slideOneForm.value.destino,
        origen: this.slideTwoForm.value.origen,
        carga: this.slideOneForm.value.carga,
        fechac: this.slideOneForm.value.fechac,
        fechad: this.slideOneForm.value.fechad,
        mercancia: this.slideOneForm.value.mercancia,
        observaciones: this.slideTwoForm.value.observaciones,
        especificaciones: this.slideTwoForm.value.especificaciones,
        codigoLavado: this.slideTwoForm.value.codigoLavado,
        done: false
    });


     this.navCtrl.popTo(OfertasPage);
 
  }
 
}