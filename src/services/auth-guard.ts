import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../app/auth';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  console.log("CURRENT TOKEN =", auth.getToken());
 
  if (auth.isAuthenticated()) {
    return true;
  } 
  const url=state.url;
  router.navigate(['/'])
  return false;
};
