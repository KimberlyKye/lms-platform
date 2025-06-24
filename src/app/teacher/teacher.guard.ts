import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class TeacherGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    switch (this.auth.cr) {
      case 'student':
        // this.router.navigate(['/student/calendar']);
        return false;
      case 'teacher':
        return true;
      default:
        // this.router.navigate(['/']);
        return false;
    }
  }
}
