import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AppService } from './app.service';
import { inject } from '@angular/core';

export function canActivateUser(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  const appService: AppService = inject(AppService);
  const router: Router = inject(Router);

  if (typeof appService.user === 'undefined') {
    const token = appService.getTokenFromStorage();

    if (typeof token === 'string') {
      return true;
    }

    return router.navigateByUrl('/login');
  }

  return true;
}
