import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReadPagePage } from './read-page.page';

const routes: Routes = [
  {
    path: '',
    component: ReadPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadPagePageRoutingModule {}
