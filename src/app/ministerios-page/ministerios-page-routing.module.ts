import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinisteriosPagePage } from './ministerios-page.page';

const routes: Routes = [
  {
    path: '',
    component: MinisteriosPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinisteriosPagePageRoutingModule {}
