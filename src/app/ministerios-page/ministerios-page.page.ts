import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ministerios-page',
  templateUrl: './ministerios-page.page.html',
  styleUrls: ['./ministerios-page.page.scss'],
})
export class MinisteriosPagePage  {

  currentSection: number = 5;

  constructor(
    private router: Router, // Para navegação
    private activatedRoute: ActivatedRoute // Para obter parâmetros da rota

  ) { }

  goToDetailPage(id: number) {
    // Navega para a página de detalhe passando o 'id' como parâmetro na URL
    this.router.navigate(['./home', id]);

  }
}
