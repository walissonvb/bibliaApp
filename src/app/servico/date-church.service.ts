import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { firstValueFrom } from 'rxjs';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit } from "firebase/firestore";

export interface DateChurch {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DateChurchService {
  // Define a referência da coleção no Firestore corretamente
  private datachurchCollection = collection(this.firebaseService.db, "Datechurch");

  constructor(
    private firebaseService: FirebaseService,
  ) { }

  async readDateChurch() {
    try {
      // Aguarda o estado de autenticação para obter o usuário atual
      const user = await firstValueFrom(this.firebaseService.authState);

      if (!user) {
        console.log('Nenhum usuário autenticado.');
        return [];
      }

      const userId = user.uid;
      console.log(`ID do usuário autenticado: ${userId}`);

      // Executa a consulta para obter documentos onde o userId corresponde ao do usuário
      const querySnapshot = await getDocs(query(
        this.datachurchCollection,
        where('userId', '==', userId)
      ));

      // Log para verificar o número de documentos retornados
      console.log('Número de documentos encontrados:', querySnapshot.size);

      // Verifica se a consulta não retornou documentos
      if (querySnapshot.empty) {
        console.log('Nenhum documento encontrado para o userId:', userId);
        return [];
      }

      const dataC: DateChurch[] = [];

      // Itera sobre os documentos e preenche o array `dataC`
      querySnapshot.forEach((doc) => {
        dataC.push({ id: doc.id, ...doc.data() } as DateChurch);
      });

      console.log('Dados lidos com sucesso para o userId:', userId, dataC);
      return dataC;

    } catch (error) {
      console.error('Erro ao ler dados:', error);
      throw error;
    }
  }
}
