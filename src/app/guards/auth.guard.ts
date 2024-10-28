import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const afAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return afAuth.authState.pipe(
    take(1),
    map(user => {
      console.log('Verificando o estado de autenticação no guard:', user);
      if (user) {
        console.log('Usuário autenticado, acesso permitido');
        return true;
      } else {
        console.log('Usuário não autenticado, redirecionando para login');
        router.navigate(['/login-page']);
        return false;
      }
    })
  );
};
