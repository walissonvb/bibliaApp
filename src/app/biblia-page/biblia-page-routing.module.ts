import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibliaPagePage } from './biblia-page.page';

const routes: Routes = [
  {
    path: '',
    component: BibliaPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BibliaPagePageRoutingModule {}
