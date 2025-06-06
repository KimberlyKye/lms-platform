import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIcon,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  providers: [AuthService],
})
// home.component.ts
export class HomeComponent {
  showForgotPasswordForm: boolean = false;
  isLoading: boolean = false;

  private snackBar = inject(MatSnackBar);
  isLoggedIn: boolean = false;
  sub: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.isLoginMode = !isLoggedIn;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isLoginMode = true; // Переключатель между логином и регистрацией

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const { email, password, name } = form.value;

    if (this.isLoginMode) {
      // Логин
      this.authService.login(email, password).subscribe({
        next: () => {
          // Перенаправление пользователя на страницу профиля
          this.authService.redirectToCalendar();
        },
        error: (error) => {
          // Обработка ошибки входа
          console.error(error);
        },
      });
    } else {
      // Регистрация
      this.authService.register(email, password, name).subscribe();
    }
  }

  // home.component.ts
  onForgotPassword(form: NgForm) {
    if (form.invalid) return;

    this.authService.sendPasswordResetEmail(form.value.email).subscribe({
      next: () => {
        this.snackBar.open('Письмо отправлено! Проверьте ваш email.', 'OK', {
          duration: 5000,
        });
        this.showForgotPasswordForm = false;
      },
      error: () => {
        this.snackBar.open('Ошибка отправки. Попробуйте позже.', 'OK');
      },
    });
  }
}
