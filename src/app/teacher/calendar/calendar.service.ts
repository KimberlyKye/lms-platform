import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventInput } from '@fullcalendar/core/index.js';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient) {}
  // calendar.service.ts
  getUserEvents(userId: string): Observable<EventInput[]> {
    return this.http.get<any[]>(`/api/users/${userId}/events`).pipe(
      map((events) =>
        events.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.startTime,
          end: event.endTime,
          color: event.type === 'deadline' ? '#f44336' : '#3f51b5',
          extendedProps: {
            courseId: event.courseId,
            type: event.type,
          },
        }))
      )
    );
  }
}
