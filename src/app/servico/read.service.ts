import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import { firstValueFrom } from 'rxjs';

export interface Meditacao{
  id:string;
  text: string;
  title: string;
  img: string;
  author: string;
  frase: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReadService {
private readCollection = collection(this.firebaseService.db, "meditacao")

  constructor(private firebaseService: FirebaseService) { }

  async readMeditacao(){
    try {
      const user = 'admin';

      if (!user) {
        console.log('Nenhum usuário autenticado.');
        return [];
      }

      const userId = user;
      console.log(`ID do usuário autenticado: ${userId}`);

      const querySnapshot = await getDocs(query(this.readCollection, where('userId', '==', userId)));
      const medDia: Meditacao[] = [];

      querySnapshot.forEach((doc) => {
        medDia.push({ id: doc.id, ...doc.data() } as Meditacao);
      });

      console.log('Dados lidos com sucesso para o userId:', userId, medDia);
      return medDia;
    } catch (error) {
      console.error('Erro ao ler dados:', error);
      throw error;
    }
  }
  async createData01(medDia: Meditacao) {
    const docRef = await addDoc(this.readCollection, medDia);
    return docRef.id;
  }

  async updateData01(id: string,medDia: Meditacao) {
    await updateDoc(doc(this.readCollection, id), {...medDia});
  }

  async deleteData01(id: string) {
    await deleteDoc(doc(this.readCollection, id));
  }

}
