import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { Student } from '../shared/types/student';
import { Person } from '../shared/types/person';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = true;
  userId: string | null = null;

  // auth.service.ts
  private isLoggedInSubject = new BehaviorSubject<boolean>(true);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private router = inject(Router);
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<void> {
    this.changeLoginState(true);
    return of();

    return this.http.post<void>('/api/auth/login', { email, password }).pipe(
      tap((res) => {
        this.changeLoginState(true);
        localStorage.setItem('user', JSON.stringify({ email, password }));
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
    //TODO: переписать на модель Person
    if (!email || !password || !name) {
      return of(null);
    }

    let params = new HttpParams();
    params = params.append('email', email.toString());
    params = params.append('password', password.toString());
    params = params.append('name', name.toString());

    return this.http.post<any>('https://localhost:7023/api/StudentProfile', {
      params: params,
    });
  }

  getCurrentUser(): Observable<any> {
    if (!this.userId) {
      return of(null);
    }
    // Здесь можно отправить запрос на сервер для получения информации о текущем пользователе
    // и возвращать Observable с результатом запроса.
    // В данном примере просто возвращаем пользователя из локального хранилища.
    const user = localStorage.getItem('user');
    if (user) {
      return of(user);
    }
    return this.http.get<any>(
      `https://localhost:7023/api/StudentProfile/${this.userId}`
    );
  }

  updateProfile(profileInfo: Person): Observable<any> {
    if (!this.userId || !profileInfo) {
      return of(null);
    }

    let params = new HttpParams();
    Object.entries(profileInfo).forEach((key, value) => {
      params = params.append(key.toString(), value.toString());
    });

    return this.http.put<any>('https://localhost:7023/api/StudentProfile', {
      params: params,
    });
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
