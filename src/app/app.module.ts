import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';

const firebaseConfig = {
  apiKey: "AIzaSyAS6A7Mzr14AvZUJRkufiaROz0ITIPvjvk",
  authDomain: "bibliaapp-wvb.firebaseapp.com",
  projectId: "bibliaapp-wvb",
  storageBucket: "bibliaapp-wvb.appspot.com",
  messagingSenderId: "26504757834",
  appId: "1:26504757834:web:f543893c33678041815cb3"
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),



  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: 'db', useValue: getFirestore(initializeApp(firebaseConfig)) },



  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
