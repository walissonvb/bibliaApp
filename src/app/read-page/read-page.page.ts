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
    console.log('ID da rota:', id); // Verificar o ID recuperado da rota

    // Verificar se os dados possuem a propriedade 'date'
    if (this.dados.date) {
      this.dados.date = this.dados.date.split('T')[0];
    }

    if (id === null) {
      this.router.navigate(['/home-page']); // Se não houver 'id', redireciona para a home
    } else {
      if (id === '1') {
        console.log('ID 1 detectado');
        this.currentRead = 1; // Atualizando o valor de currentRead
      } else if (id === '2') {
        try {
          // Aguardando a resposta da função readMeditRead
          const response = await this.service.readMeditRead();

          // Verificando o conteúdo retornado
          console.log('Dados recebidos:', response);

          // Atribuindo o resultado ao array 'card'
          this.card = response;

          // Atualizando o valor de currentRead
          this.currentRead = 2;
        } catch (error) {
          console.error('Erro ao ler os dados:', error);
        }
      }
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
    this.goToDetailPage(10);
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

  goToDetailPage(id: number) {
    // Navega para a página de detalhe passando o 'id' como parâmetro na URL
    this.router.navigate(['./home', id]);

  }

}
