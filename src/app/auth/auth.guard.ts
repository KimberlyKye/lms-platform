import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  constructor() {}

  canActivate(): boolean {
    return true;
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
