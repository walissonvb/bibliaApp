import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Chapters {
  id: string;
  number: string;
  bibleId: string;
  bookId: string;
  reference: string;
}

@Component({
  selector: 'app-biblia-page',
  templateUrl: './biblia-page.page.html',
  styleUrls: ['./biblia-page.page.scss'],
})
export class BibliaPagePage implements OnInit {
  detailId: number | null = null;
  dataBooks: any[] = [];
  selectedBookID: string = ''; // ID do livro selecionado
  selectedChapters: Chapters[] = []; // Lista de capítulos do livro selecionado
  chapterData: any[] = []; // Inicializamos como um array vazio
  selectedBookVers: string = '65eec8e0b60e656b-01'; // Exemplo de versão da Bíblia
  showBooks: boolean = true; // Controla a exibição da lista de livros
  showChapters: boolean = false; // Controla a exibição da lista de capítulos
  showVerses: boolean = false; // Controla a exibição dos versículos
  API_KEY: string = '78da9dd8b04098c1b5c3027819a3e16a'; // Sua chave de API

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ID recebido da rota:', id);

    if (id === null) {
      this.router.navigate(['/home-page']);
    } else {
      await this.getBooks(); // Busca a lista de livros
    }
  }

  // Função para buscar os livros da API da Bíblia
// Função para buscar os livros da API da Bíblia
async getBooks() {
  const url = `https://api.scripture.api.bible/v1/bibles/${this.selectedBookVers}/books`;

  try {
    const response = await fetch(url, {
      headers: { 'api-key': this.API_KEY }
    });

    if (response.ok) {
      const data = await response.json();
      this.dataBooks = data?.data || []; // Sempre define como um array
      this.showBooks = true;
      this.showChapters = false;
      this.showVerses = false;
      console.log(this.dataBooks);
    } else {
      console.error('Erro ao buscar livros:', response.statusText);
    }
  } catch (error) {
    console.error('Erro de conexão ao buscar livros:', error);
  }
}

// Função para buscar os capítulos de um livro selecionado
async getChapters(bookID: string) {
  this.selectedBookID = bookID;

  const url = `https://api.scripture.api.bible/v1/bibles/${this.selectedBookVers}/books/${bookID}/chapters`;

  try {
    const response = await fetch(url, {
      headers: { 'api-key': this.API_KEY }
    });

    if (response.ok) {
      const data = await response.json();
      this.selectedChapters = data?.data || []; // Sempre define como um array
      console.log(this.selectedChapters);

      this.showBooks = false;
      this.showChapters = true;
      this.showVerses = false;
    } else {
      console.error('Erro ao buscar capítulos:', response.statusText);
    }
  } catch (error) {
    console.error('Erro de conexão ao buscar capítulos:', error);
  }
}

// Função para buscar os versículos de um capítulo
// Função para buscar os versículos de um capítulo e obter os textos
async getVerses(chapterId: string) {
  const url = `https://api.scripture.api.bible/v1/bibles/${this.selectedBookVers}/chapters/${chapterId}/verses`;

  try {
    const response = await fetch(url, {
      headers: { 'api-key': this.API_KEY }
    });

    if (response.ok) {
      const data = await response.json();
      const verses = data.data || [];

      // Agora precisamos buscar o texto de cada versículo
      this.chapterData = await Promise.all(verses.map(async (verse: any) => {
        const text = await this.getVerseText(verse.id); // Busca o texto do versículo
        return { ...verse, content: text }; // Adiciona o texto ao objeto do versículo
      }));

      this.showBooks = false;
      this.showChapters = false;
      this.showVerses = true;
    } else {
      console.error('Erro ao buscar versículos:', response.statusText);
    }
  } catch (error) {
    console.error('Erro de conexão ao buscar versículos:', error);
  }
}

// Função para buscar o texto de um versículo
async getVerseText(verseId: string) {
  const url = `https://api.scripture.api.bible/v1/bibles/${this.selectedBookVers}/verses/${verseId}?content-type=text`;

  try {
    const response = await fetch(url, {
      headers: { 'api-key': this.API_KEY }
    });

    if (response.ok) {
      const data = await response.json();
      return data.data.content; // Retorna o conteúdo do versículo
    } else {
      console.error('Erro ao buscar texto do versículo:', response.statusText);
    }
  } catch (error) {
    console.error('Erro de conexão ao buscar texto do versículo:', error);
  }

  return null; // Retorna null caso ocorra algum erro
}

  // Função para buscar os versículos de um capítulo

  closeAll() {
    this.router.navigate(['/home-page']);
  }
}
