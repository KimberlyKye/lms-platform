import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';

export type UserRole = 'student' | 'teacher';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserRole = new BehaviorSubject<UserRole | null>('teacher');
  private isAuthenticated = true;
  userId: string | null = null;

  // auth.service.ts
  private isLoggedInSubject = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private router = inject(Router);
  private http = inject(HttpClient);

  get role(): UserRole | null {
    return 'student';
    return this.currentUserRole.value;
  }

  login(email: string, password: string): Observable<{ role: UserRole }> {
    this.changeLoginState(true);

    return of();

    return this.http
      .post<{ role: UserRole }>('/api/auth/login', Credential)
      .pipe(
        tap((response) => {
          this.currentUserRole.next(response.role);
          localStorage.setItem('userRole', response.role);
        }),
        catchError((err) => {
          let errorMsg = 'Ошибка входа';
          if (err.status === 401) errorMsg = 'Неверный email или пароль';
          throw new Error(errorMsg);
        })
      );
  }

  sendPasswordResetEmail(email: any): Observable<void> {
    throw new Error('Method not implemented.');
  }

  logout() {
    this.userId = null;
    this.changeLoginState(false);

    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  changeLoginState(state: boolean) {
    this.isAuthenticated = state;
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  register(email: any, password: any, name: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getCurrentUser(): Observable<any> {
    // Здесь можно отправить запрос на сервер для получения информации о текущем пользователе
    // и возвращать Observable с результатом запроса.
    // В данном примере просто возвращаем пользователя из локального хранилища.
    const user = localStorage.getItem('user') || {
      email: 'qqq@mail.ru',
      password: '*******',
      name: 'Al Ro',
    };
    return of(user);
  }

  updateProfile(value: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  redirectToCalendar() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/calendar']);
    }
  }

  redirectToProfile() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/profile']);
    }
  }
}
