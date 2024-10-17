import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinisteriosPagePageRoutingModule } from './ministerios-page-routing.module';

import { MinisteriosPagePage } from './ministerios-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinisteriosPagePageRoutingModule
  ],
  declarations: [MinisteriosPagePage]
})
export class MinisteriosPagePageModule {}
