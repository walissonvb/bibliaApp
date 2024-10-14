import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReadPagePageRoutingModule } from './read-page-routing.module';

import { ReadPagePage } from './read-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadPagePageRoutingModule
  ],
  declarations: [ReadPagePage]
})
export class ReadPagePageModule {}
