import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule),  canActivate: [authGuard]
  },
  {
    path: 'biblia/:id',
    loadChildren: () => import('./biblia-page/biblia-page.module').then( m => m.BibliaPagePageModule),  canActivate: [authGuard]
  },
  {
    path: 'read/:id',
    loadChildren: () => import('./read-page/read-page.module').then( m => m.ReadPagePageModule),  canActivate: [authGuard]
  },
  {
    path: 'ministerios/:id',
    loadChildren: () => import('./ministerios-page/ministerios-page.module').then( m => m.MinisteriosPagePageModule),  canActivate: [authGuard]
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
