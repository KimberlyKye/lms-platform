import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UserRole } from './auth.service';
import { environment } from '../../environments/environment';
import { Person } from '../shared/types/person';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  apiUrl: string = environment?.apiUrl ?? 'http://localhost:5271';

  constructor(private http: HttpClient) {}

  login(
    email: string,
    password: string,
    userId: string | number | null
  ): Observable<{ user: Person; role: UserRole }> {
    let newUser: Person = {
      phoneNumber: '',
      email: email,
      birthDate: '',
    };

    // current mock with diff role
    var role: UserRole = 'teacher';
    // var role: UserRole = 'student';

    // current with api
    const path = new URL(`api/StudentProfile/${userId ?? 1}`, this.apiUrl);
    return this.http.get<any>(path.toString()).pipe(
      map((res) => {
        return { user: res, role: role };
      })
    );

    // old
    // return this.http.post<{ role: UserRole }>('/api/auth/login', Credential);
  }
}
