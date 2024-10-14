import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BibliaPagePageRoutingModule } from './biblia-page-routing.module';

import { BibliaPagePage } from './biblia-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BibliaPagePageRoutingModule
  ],
  declarations: [BibliaPagePage]
})
export class BibliaPagePageModule {}
