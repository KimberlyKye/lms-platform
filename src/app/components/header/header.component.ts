import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, UserRole } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: { class: 'dark-theme' },
})
export class HeaderComponent implements AfterViewInit {
  isLoggedIn = false;
  role: UserRole | null = null;

  get hasTeacherRole(): boolean {
    return this.role === 'teacher';
  }

  get hasStudentRole(): boolean {
    return this.role === 'student';
  }

  constructor(private authService: AuthService, private router: Router) {}

  // header.component.ts
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngAfterViewInit() {
    // Подписываемся на изменения авторизации
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.role = this.authService.cr;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
