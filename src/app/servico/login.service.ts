import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa o Firestore

export interface User {
  id: string;
  email: string;
  password?: string; // Evite armazenar senha diretamente para segurança
  admin: boolean;
  congregacao: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore // Injeta o Firestore
  ) {}

  // Função de registro que salva dados extras
  async register(email: string, password: string, admin: boolean, congregacao: string, foto: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user ? userCredential.user.uid : null;

      if (uid) {
        // Cria o documento no Firestore com as informações extras
        await this.firestore.collection('users').doc(uid).set({
          id: uid,
          email: email,
          admin: admin,
          congregacao: congregacao,
          foto: foto
        });
        return uid;
      }
      return null;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user ? userCredential.user.uid : null;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }
}
