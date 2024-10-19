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
  versiculoDiario: any={};

  constructor(
    private servicoRead: ReadService,
    private router: Router,
  ) {
    this.currentRead = 0;
  }

  ngOnInit() {
    this.allCard();
    this.getVers();

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

  async getVers() {
  const storedVersiculo = localStorage.getItem('versiculoDiario');
  const storedDate = localStorage.getItem('versiculoDate');
  const currentDate = new Date().getTime();
  const storeImagem = localStorage.getItem('versiculoImagem')

  // Verifica se há um versículo salvo e se ainda está dentro das 24 horas
  if (storedVersiculo && storedDate) {
    const savedDate = new Date(storedDate).getTime();
    const differenceInHours = (currentDate - savedDate) / (1000 * 60 * 60);

    // Se o versículo foi salvo há menos de 24 horas, usa o versículo do localStorage
    if (differenceInHours < 24) {
      this.versiculoDiario = JSON.parse(storedVersiculo);
      console.log('Usando versículo salvo:', this.versiculoDiario);
      return;
    }
  }

  // Se não há versículo salvo ou já passou mais de 24 horas, busca um novo
  try {
    console.log('Buscando novo versículo');
    const version = 'nvi'; // Defina a versão da Bíblia que você quer
    const response = await fetch(`https://www.abibliadigital.com.br/api/verses/${version}/random`);

    if (!response.ok) {
      console.error('Erro ao buscar o verso:', response.statusText);
    } else {
      this.versiculoDiario = await response.json();

      // Salva o versículo e a data atual no localStorage
      localStorage.setItem('versiculoDiario', JSON.stringify(this.versiculoDiario));
      localStorage.setItem('versiculoDate', new Date().toString());

      console.log('Versículo salvo no localStorage:', this.versiculoDiario);
    }
  } catch (error) {
    console.error('Erro ao buscar o verso:', error);
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
