import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReadService, Meditacao } from '../servico/read.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  card: Meditacao[] = [];
  cardFilter: Meditacao[] = [];
  currentRead: number;
  currentDocs: Meditacao[] = [];
  docIndex = 0;
  cardOne: Meditacao[] = [];

  constructor(
    private servicoRead: ReadService,
    private router: Router,
  ) {
    this.currentRead = 0;
  }

  ngOnInit() {
    this.allCard();

    this.servicoRead.readMeditacao().then(response => {
      this.card = response;
      console.log('Meditações carregadas:', this.card);

      // Inicializar os primeiros dois documentos
      this.updateDocs();

      // Atualizar os documentos a cada 30 segundos
      console.log('Iniciando o intervalo de 30 segundos para atualizar documentos');
      setInterval(() => {
        console.log('Atualizando os documentos...');
        this.updateDocs();
      }, 30000); // 30 segundos
    }).catch(error => {
      console.error('Erro ao carregar meditações:', error);
    });
  }

  // Atualiza os dois documentos exibidos
  updateDocs() {
    console.log('Atualizando documentos, índice atual:', this.docIndex);
    if (this.card.length === 0) {
      console.warn('Nenhum documento disponível para exibição.');
      return;
    }

    this.currentDocs = this.card.slice(this.docIndex, this.docIndex + 2);
    console.log('Documentos exibidos:', this.currentDocs);

    this.docIndex += 2;

    // Reinicia quando alcançar o final da lista
    if (this.docIndex >= this.card.length) {
      console.log('Reiniciando o índice de documentos');
      this.docIndex = 0;
    }
  }

  goToDetailPage(id: number) {
    this.router.navigate(['./biblia', id]);
  }

  goToDetalMeditacao(id: number) {
    this.currentRead = id;
    this.router.navigate(['./read', id]);
  }

  async allCard() {
    try {
      this.cardOne = await this.servicoRead.readMeditRead();  // Carrega as meditações na variável cardOne
      console.log('retorno all card', this.cardOne);
    } catch (error) {
      console.error('Erro ao carregar as meditações:', error);
    }

  }

  goToMinist(id: number) {
    console.log('Navegando para a página de ministérios, id:', id);
    this.router.navigate(['./ministerios', id]);
  }
  async detalMeditacao(date: string){
    console.log(date)
    this.router.navigate(['./read', date]);

  }
}
