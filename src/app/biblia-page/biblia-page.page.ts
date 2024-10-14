import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biblia-page',
  templateUrl: './biblia-page.page.html',
  styleUrls: ['./biblia-page.page.scss'],
})
export class BibliaPagePage implements OnInit {
  detailId: number | null = null;
  dataBoocks: any[] = []; // Lista de livros
  selectedBookAbbrev: string = ''; // Abreviação do livro selecionado
  seletctedBookChap: number[] = []; // Lista de capítulos do livro selecionado
  chapterData: any = null; // Dados do capítulo (versículos)
  selectedBookVers: string = 'nvi'; // Versão do livro
  showBooks: boolean = true; // Controla a exibição da lista de livros
  showChapters: boolean = false; // Controla a exibição da lista de capítulos
  showVerses: boolean = false; // Controla a exibição dos versículos

  constructor(
    private router: ActivatedRoute,
  ) {}

 async ngOnInit() {
  const id = this.router.snapshot.paramMap.get('id');
  if (id !== null) {
    this.detailId = +id;
  }


  const response = await fetch('https://www.abibliadigital.com.br/api/books');
    if (response.ok) {
      this.dataBoocks = await response.json();
      this.showBooks = true;  // Mostra a lista de livros
      this.showChapters = false; // Esconde a lista de capítulos
      this.showVerses = false;  // Esconde os versículos
    } else {
      console.error('Erro ao buscar livros:', response.statusText);
    }
  }

  // Buscar os livros da API
  async getboocks() {
    const response = await fetch('https://www.abibliadigital.com.br/api/books');
    if (response.ok) {
      this.dataBoocks = await response.json();
      this.showBooks = true;  // Mostra a lista de livros
      this.showChapters = false; // Esconde a lista de capítulos
      this.showVerses = false;  // Esconde os versículos
    } else {
      console.error('Erro ao buscar livros:', response.statusText);
    }
  }

  // Selecionar o livro e gerar capítulos
  getChap(chapters: number, abbrev: string) {
    this.seletctedBookChap = Array.from({ length: chapters }, (_, i) => i + 1);
    this.selectedBookAbbrev = abbrev;
    this.showBooks = false;   // Esconde a lista de livros
    this.showChapters = true; // Mostra a lista de capítulos
    this.showVerses = false;  // Esconde os versículos
  }

  // Selecionar capítulo e buscar versículos
  async getVersiculo(chapNum: number) {
    const url = `https://www.abibliadigital.com.br/api/verses/${this.selectedBookVers}/${this.selectedBookAbbrev}/${chapNum}`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        this.chapterData = await response.json(); // Armazena os dados do capítulo
        this.showBooks = false;   // Esconde a lista de livros
        this.showChapters = false; // Esconde a lista de capítulos
        this.showVerses = true;   // Mostra os versículos
      } else {
        console.error('Erro ao buscar o capítulo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    }
  }
}


