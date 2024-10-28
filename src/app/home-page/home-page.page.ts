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
  inspiraçãoDiaria = [
  "JER.29.11",
  "PSA.23",
  "1COR.4.4-8",
  "PHP.4.13",
  "JHN.3.16",
  "ROM.8.28",
  "ISA.41.10",
  "PSA.46.1",
  "GAL.5.22-23",
  "HEB.11.1",
  "2TI.1.7",
  "1COR.10.13",
  "PRO.22.6",
  "ISA.40.31",
  "JOS.1.9",
  "HEB.12.2",
  "MAT.11.28",
  "ROM.10.9-10",
  "PHP.2.3-4",
  "MAT.5.43-44",
  ];
  selectedBookVers: string = '65eec8e0b60e656b-01'; // Exemplo de versão da Bíblia
  API_KEY: string = '78da9dd8b04098c1b5c3027819a3e16a'; // Sua chave de API
  versiculoDiario:any[] = []; // Ajuste para string em vez de array
  verseRef: string = '';

  constructor(
    private servicoRead: ReadService,
    private router: Router,
  ) {
    this.currentRead = 0;
  }

 async ngOnInit() {
   await this.allCard();
   await this.getVersiculoDoDia();

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

  async getVersiculoDoDia() {
    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // Dia do mês

    // Seleciona um versículo baseado no dia do mês
    const verseIndex = (currentDay - 1) % this.inspiraçãoDiaria.length;
    const verseID = this.inspiraçãoDiaria[verseIndex];
    this.verseRef = verseID; // Atribua aqui

    // Faz a chamada à API para buscar o versículo
    try {
      console.log('Buscando novo versículo:', verseID);
      const response = await fetch(`https://api.scripture.api.bible/v1/bibles/${this.selectedBookVers}/search?query=${verseID}`, {
        headers: {
          'api-key': this.API_KEY
        }
      });
      if (!response.ok) {
        console.error('Erro ao buscar o verso:', response.statusText);
      } else {
        const verseData = await response.json();
        const passage = verseData.data.passages[0];
        const content = passage.content; // Extrai o conteúdo do versículo
        this.versiculoDiario = content; // Armazena o conteúdo no versiculoDiario
        console.log('Versículo do dia:', this.versiculoDiario);
      }
    } catch (error) {
      console.error('Erro ao buscar o verso:', error);
    }
  }

  goToDetailPage(id: number) {
    this.router.navigate(['./login', id]);

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
  async detalMeditacao(date: string) {
    console.log(date)
    this.router.navigate(['./read', date]);

  }
}
