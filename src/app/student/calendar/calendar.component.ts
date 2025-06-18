import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventClickArg, EventInput, FormatterInput } from '@fullcalendar/core';
import { CalendarService } from './calendar.service';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [CalendarService, AuthService, HttpClient],
  imports: [CommonModule, FullCalendarModule, MatChipsModule, HttpClientModule],
})
export class CalendarComponent {
  upcomingDeadlines: EventInput[] = [];

  constructor(
    private router: Router,
    private calendarService: CalendarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.calendarService
      .getUserEvents(this.authService.userId!)
      .subscribe((events) => {
        this.upcomingDeadlines = events.filter((event: EventInput) => {
          this.calendarOptions.events = events;

          const deadline = event.start
            ? new Date(event.start.toString())
            : null;
          return deadline && this.isEventUpcoming(deadline);
        });
      });
  }

  isEventUpcoming(deadline: Date): boolean {
    const now = new Date();
    return deadline > now && deadline.getTime() - now.getTime() < 86400000 * 7; // 7 дней
  }

  // Данные событий (занятия, дедлайны)
  events: EventInput[] = [
    {
      id: '1',
      title: 'Лекция: Angular Basics',
      start: '2024-06-10T10:00:00',
      end: '2024-06-10T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '101',
        type: 'lecture',
      },
    },
    {
      title: 'Дедлайн: ДЗ по React',
      start: '2024-06-15T23:59:00',
      color: '#f44336',
      extendedProps: {
        courseId: '102',
        type: 'deadline',
      },
    },
  ];

  // Настройки календаря
  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: 'ru',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek',
    },
    events: this.events,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    } as FormatterInput,
    eventClassNames: (arg: any) => {
      return [`fc-event-${arg.event.extendedProps['type']}`];
    },
    eventDidMount: (arg: any) => {
      const event = arg.event;
      const now = new Date();
      const deadline = event.start ? new Date(event.start) : null;

      if (
        deadline &&
        deadline > now &&
        deadline.getTime() - now.getTime() < 86400000 * 3
      ) {
        // 3 дня до дедлайна
        arg.el.style.borderLeft = '4px solid #FF9800'; // Оранжевая полоса
        arg.el.classList.add('fc-event-urgent');
      }
    },
  };

  // Обработчик клика на событие
  handleEventClick($event: Event) {
    let event = $event as unknown as EventClickArg;
    const courseId = event.event.extendedProps['courseId'];
    this.router.navigate(['/courses', courseId], {
      fragment: `lesson-${event.event.id}`, // Скролл к уроку
    });
  }

  helperEventClick($event: EventInput) {
    let event = $event as unknown as EventClickArg;
    const courseId = event.event.extendedProps['courseId'];
    this.router.navigate(['/courses', courseId]);
  }

  handleDateClick($event: Event) {
    throw new Error('Method not implemented.');
  }
}
