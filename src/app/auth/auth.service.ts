import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Student } from '../shared/types/student';
import { Person } from '../shared/types/person';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  userId: string | number | null = null;

  apiUrl: string = environment?.apiUrl ?? 'http://localhost:5271';

  // auth.service.ts
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { AuthApiService } from './auth-api.service';

export type UserRole = 'student' | 'teacher';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserRole = new BehaviorSubject<UserRole | null>('teacher');
  private isAuthenticated = false;
  userId: string | null = null;

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private router = inject(Router);
  private http = inject(HttpClient);
  currentUser: any;

  constructor() {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      this.updateCurrentUser(JSON.parse(localUser ?? ''));
    }
  }

  updateCurrentUser(user?: Person): void {
    this.currentUser = user;
    if (user && user.id) {
      this.userId = user.id!;
      this.changeLoginState(true);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      this.userId = null;
      this.changeLoginState(false);
      localStorage.removeItem('user');
    }
    console.log(user);
  }

  login(email: string, password: string): Observable<void> {
    // this.changeLoginState(true);
    // return of();
    const path = new URL(`api/StudentProfile/${this.userId ?? 1}`, this.apiUrl);
    return this.http.get<any>(path.toString()).pipe(
      map((res) => {
        console.log(res);
        this.updateCurrentUser(res);
        return;
      }),
      catchError((err) => {
        let errorMsg = 'Ошибка входа';
        if (err.status === 401) errorMsg = 'Неверный email или пароль';
        return throwError(errorMsg);
      })
    );
  private api = inject(AuthApiService);

  get role(): UserRole | null {
    return this.currentUserRole.value;
  }

  login(email: string, password: string): Observable<{ role: UserRole }> {
    this.changeLoginState(true);

    return this.api.login(email, password)
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
    this.updateCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  changeLoginState(state: boolean) {
    this.isAuthenticated = state;
    this.isLoggedInSubject.next(this.isLoggedIn());
    this.isLoggedIn$ = this.isLoggedInSubject.asObservable();
  }

  register(newUser: Person): Observable<any> {
    if (!newUser) {
      return of(null);
    }

    const path = new URL('api/StudentProfile/', this.apiUrl);
    return this.http
      .post<any>(path.toString(), {
        ...newUser,
      })
      .pipe(
        tap((user) => {
          console.log('Пользователь успешно зарегистрирован:', user);
          this.updateCurrentUser(user);
          return user;
        }),
        catchError((error) => {
          console.error('Ошибка при регистрации пользователя:', error);
          return throwError(error);
        })
      );
  }

  getCurrentUser(): Observable<any> {
    // TODO: Здесь можно отправить запрос на сервер для получения информации о текущем пользователе
    // и возвращать Observable с результатом запроса.
    // В данном примере просто возвращаем пользователя из локального хранилища.
    if (!this.userId) {
      console.error('Пользователь не найден');
      return throwError('Пользователь не найден!');
    }

    const path = new URL(`api/StudentProfile/${this.userId}`, this.apiUrl);
    return this.http.get<any>(path.toString()).pipe(
      map((user) => {
        this.updateCurrentUser(user);
        return user;
      }),
      catchError((error) => {
        console.error('Ошибка при получении данных пользователя:', error);
        return throwError(error);
      })
    );
  }

  updateProfile(profileInfo: Person): Observable<any> {
    if (!this.userId || !profileInfo) {
      return of(null);
    }

    const path = new URL('api/StudentProfile/', this.apiUrl);
    return this.http
      .put<Person>(path.toString(), {
        ...profileInfo,
      })
      .pipe(
        tap((user) => this.updateCurrentUser(user)),
        catchError((error) => {
          console.error('Ошибка при обновлении данных пользователя:', error);
          return throwError(error);
        })
      );
  }

  redirectToCalendar() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([`${this.currentUserRole}/profile`]);
    }
  }

  redirectToProfile() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([`${this.currentUserRole}/profile`]);
    }
  }
}
