import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService, User } from '../servico/login.service';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage {
  loginButtonText = 'Entrar';
  registerButtonText = 'Sem cadastro? Clique aqui';
  loginButtonText0 = 'Cadastrar';
  registerButtonText0 = 'Já tem cadastro? faça Login!';
  currentSection: number = 1;

  dados: User = {
    id: '',
    email: '',
    password: '',
    admin: false,
    congregacao: 'C3 IGREJA | BATISTA ELSHADAY | OITAVA IGREJA | IDPB | VISITANTE',
    foto: '',
  };

  constructor(
    private servicoLogin: LoginService,
    private router: Router,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
  ) {}


  async login(form: NgForm) {
    const { email, password, admin,  } = form.value;
    try {
      const userId = await this.servicoLogin.login(email, password);
      if (userId) {
        this.dados.id = userId;
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.router.navigate(['/home-page']);
        if (await this.modalCtrl.getTop()) {
          this.modalCtrl.dismiss(userId);
        }
        this.showToast('Seja bem-vindo!', 'success');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      this.showToast('Não foi possível concluir o login, confira seus dados e tente novamente!', 'danger');
      const topModal = await this.modalCtrl.getTop();
      if (topModal) {
        await this.modalCtrl.dismiss();      }
    }
  }

  async logout() {
    try {
      await this.servicoLogin.logout();
      this.router.navigate(['/login-page']);
      this.showToast('Até mais tarde!', 'success');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      this.showToast('Algo deu errado ao sair, verifique sua conexão!', 'danger');
    }
  }

  async cadastrar(form: NgForm) {
    const { email, password, congregacao, foto } = form.value;
    try {
      const userId = await this.servicoLogin.register(email, password, false, congregacao, foto);
      if (userId) {
        console.log('Cadastro Realizado Com Sucesso!');
        this.currentSection = 1; // Altera o valor de currentSection para 1
        this.showToast('Cadastro Realizado Com Sucesso!', 'success');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      this.showToast('Erro ao Cadastrar', 'danger');
      this.currentSection = 1; // Altera o valor de currentSection para 1 também em caso de erro
    }
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
      color
    });
    toast.present();
  }
}
