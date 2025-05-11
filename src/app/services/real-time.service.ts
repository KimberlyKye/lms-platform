import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, interval, switchMap, startWith, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RealTimeService {
  private updates = new Subject<any>();

  constructor(private http: HttpClient) {}

  // Получение обновлений каждые N секунд
  getUpdates(pollInterval: number = 10000) {
    return interval(pollInterval).pipe(
      startWith(0), // Сразу делаем первый запрос
      switchMap(() => this.http.get(`api/teacher/updates`)),
      tap((update) => this.updates.next(update))
    );
  }

  // Ручная проверка обновлений
  checkUpdates() {
    return this.http.get(`api/teacher/updates`);
  }

  // Подписка на все обновления
  onUpdate() {
    return this.updates.asObservable();
  }

  unsubscribe() {
    this.updates.unsubscribe();
  }
}
