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

  }

  detailId: number | null = null;
  atualizar = false;

  constructor(
    private toastCtrl: ToastController,
    private service: ReadService,
    private router: Router, // Para navegação
    private activatedRoute: ActivatedRoute // Para obter parâmetros da rota
  ) { }

  ngOnInit() {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id === null) {


      this.router.navigate(['/home-page']);
    }

  }
  closeAll() {
    this.router.navigate(['/home-page']);
  }

  async enviando(form: NgForm) {
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
