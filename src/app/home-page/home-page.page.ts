import { Component } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage  {


  constructor(
    private router: Router,
  ) { }

  goToDetailPage(id: number) {
    // Navega para a página de detalhe passando o 'id' como parâmetro na URL
    this.router.navigate(['./biblia', id]);

}
goToDetalMeditacao(id: number){
  this.router.navigate(['./read', id]);

}
}
