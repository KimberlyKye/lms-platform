import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class StudentGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    switch (this.auth.cr) {
      case 'student':
        return true;
      case 'teacher':
        // this.router.navigate(['/teacher/calendar']);
        return false;
      default:
        // this.router.navigate(['/']);
        return false;
    }
  }
}
