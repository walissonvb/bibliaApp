import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReadService, Meditacao } from '../servico/read.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-read-page',
  templateUrl: './read-page.page.html',
  styleUrls: ['./read-page.page.scss'],
})
export class ReadPagePage implements OnInit {
  dados: Meditacao = {
    id: '',
    text: '',
    title: '',
    img: '',
    author: '',
    frase: '',
    userId: '',
    date: new Date().toISOString()
  }
  card : Meditacao [] = [];
  cardOne : Meditacao [] = [];
  filteredCard: Meditacao [] = [];
  currentRead: number;
  detailId: number | null = null;
  atualizar = false;

  constructor(
    private toastCtrl: ToastController,
    private service: ReadService,
    private router: Router, // Para navegação
    private activatedRoute: ActivatedRoute // Para obter parâmetros da rota
  ) {
    this.currentRead = 0;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('ID da rota:', id);

    // Formatar a data, se disponível
    if (this.dados.date) {
      this.dados.date = this.dados.date.split('T')[0];
    }

    // Verifica se o ID é nulo, caso sim, navega para a home
    if (!id) {
      console.log('ID é nulo, redirecionando para home...');
      await this.router.navigate(['/home-page']);
      return;  // Encerrando a execução após redirecionar
    }

    // Caso o ID seja 1
    if (id === '1') {
      console.log('ID 1 detectado');
      this.currentRead = 1;
      return;  // Encerrando a execução após configurar currentRead
    }

    // Caso o ID seja 2
    if (id === '2') {
      try {
        const response = await this.service.readMeditRead();
        console.log('Dados recebidos para ID 2:', response);
        this.card = response;
        this.currentRead = 2;
      } catch (error) {
        console.error('Erro ao ler os dados para ID 2:', error);
      }
      return;  // Encerrando a execução após tratar ID 2
    }

    // Caso o ID não seja 1 ou 2, chamar a função oldCard
    try {
      await this.oldCard(id);
    } catch (error) {
      console.error('Erro ao executar oldCard:', error);
    }
  }

    closeAll() {
    this.router.navigate(['/home-page']);
  }

  async enviando(form: NgForm) {
    console.log(form)
    if (form.valid) {
      const cliente = form.value;
      cliente.userId = this.dados.userId;
      try {
        if (this.atualizar) {
          if (this.dados && this.dados.id) {
            await this.service.updateData01(this.dados.id, cliente);
            this.showSuccessToast('Cliente atualizado com sucesso!');
          }
        } else {
          await this.service.createData01(cliente);
          this.showSuccessToast('Cliente criado com sucesso!');
        }
      } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        this.showErrorToast('Erro ao salvar os dados. Por favor, tente novamente.');
      }
    } else {
      this.showErrorToast('Por favor, preencha todos os campos obrigatórios.');
    }
    this.goToDetailPage();
  }
  async showSuccessToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async showErrorToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  goToDetailPage() {
    // Navega para a página de detalhe passando o 'id' como parâmetro na URL
    this.router.navigate(['./home-page']);

  }
  async oldCard(id: string) {
    console.log(id);
    try {
      // Lê todas as meditações
      this.cardOne = await this.service.readMeditacao();
      console.log('All Cards:', this.cardOne);

      // Usar find para buscar o primeiro dado que corresponde ao critério (exemplo: data)
      const cardFilter = this.cardOne.find(dados => dados.date === id); // Ajuste o critério conforme sua lógica
console.log(cardFilter)
      if (cardFilter) {
        this.filteredCard = [cardFilter]; // Armazena o resultado como um array para usar no *ngFor
        console.log('Filtered Card:', this.filteredCard);
        this.currentRead = 3; // Atualiza o estado para exibir os cards filtrados
      } else {
        console.log('Nenhum dado encontrado para o critério especificado.');
      }

    } catch (error) {
      console.error('Erro ao carregar as meditações:', error);
    }
  }

}
