import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRole } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ role: UserRole }> {
    return of({ role: 'teacher' });

    return this.http.post<{ role: UserRole }>('/api/auth/login', Credential);
  }
}
