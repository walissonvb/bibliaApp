import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { ReadService, Meditacao } from '../servico/read.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
card : Meditacao [] = [];


  constructor(
    private servicoRead: ReadService,
    private router: Router,
  ) { }

  ngOnInit() {

    const card = this.servicoRead.readMeditacao().then ((response) =>{
      this.card = response;
      });

      console.log(card)

  }
  goToDetailPage(id: number) {
    // Navega para a página de detalhe passando o 'id' como parâmetro na URL
    this.router.navigate(['./biblia', id]);

}
goToDetalMeditacao(id: number){
  this.router.navigate(['./read', id]);

}
async cardOne(){

}
}
