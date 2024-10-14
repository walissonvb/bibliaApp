import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'biblia/:id',
    loadChildren: () => import('./biblia-page/biblia-page.module').then( m => m.BibliaPagePageModule)
  },
  {
    path: 'read/:id',
    loadChildren: () => import('./read-page/read-page.module').then( m => m.ReadPagePageModule)
  },
  {
    path: '**', // Curinga para rotas não reconhecidas
    redirectTo: 'home-page' // Redireciona para a página inicial
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
