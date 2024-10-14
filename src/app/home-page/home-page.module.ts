import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePagePageRoutingModule } from './home-page-routing.module';

import { HomePagePage } from './home-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePagePageRoutingModule,
  ],
  declarations: [HomePagePage]
})
export class HomePagePageModule {}
