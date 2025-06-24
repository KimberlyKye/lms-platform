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
export class TeacherCalendarComponent {
  upcomingDeadlines: EventInput[] = [];

  constructor(
    private router: Router,
    private calendarService: CalendarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.calendarService
      .getUserEvents(this.authService.userId!.toString())
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
  // Расширенный календарь занятий и дедлайнов преподавателя на май-июнь-июль 2025

  events: EventInput[] = [
    {
      id: '1',
      title: 'Лекция: Основы алгоритмов и структур данных',
      start: '2025-05-05T10:00:00', // Понедельник
      end: '2025-05-05T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '201',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Реализация сортировок',
      start: '2025-05-07T14:00:00', // Среда
      end: '2025-05-07T17:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '201',
        type: 'practice',
      },
    },
    {
      title: 'Обзор проектов студентов',
      start: '2025-05-09T10:00:00', // Пятница
      end: '2025-05-09T12:00:00',
      color: '#ff9800',
      extendedProps: {
        courseId: '201',
        type: 'review',
      },
    },
    {
      id: '2',
      title: 'Лекция: Компоненты Vue.js',
      start: '2025-05-12T10:00:00', // Понедельник
      end: '2025-05-12T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '202',
        type: 'lecture',
      },
    },
    {
      title: 'Лабораторная работа: Создание SPA',
      start: '2025-05-14T14:00:00', // Среда
      end: '2025-05-14T17:00:00',
      color: '#4caf50',
      extendedProps: {
        courseId: '202',
        type: 'laboratory',
      },
    },
    {
      title: 'Индивидуальные консультации',
      start: '2025-05-16T10:00:00', // Пятница
      end: '2025-05-16T12:00:00',
      color: '#ff9800',
      extendedProps: {
        courseId: '202',
        type: 'consultation',
      },
    },
    {
      id: '3',
      title: 'Лекция: Разработка мобильных приложений на Flutter',
      start: '2025-05-19T10:00:00', // Понедельник
      end: '2025-05-19T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '203',
        type: 'lecture',
      },
    },
    {
      title: 'Семинар: Интеграция Firebase',
      start: '2025-05-21T14:00:00', // Среда
      end: '2025-05-21T17:00:00',
      color: '#4caf50',
      extendedProps: {
        courseId: '203',
        type: 'seminar',
      },
    },
    {
      title: 'Финальный проект: MVP мобильного приложения',
      start: '2025-05-23T10:00:00', // Пятница
      end: '2025-05-23T12:00:00',
      color: '#ff9800',
      extendedProps: {
        courseId: '203',
        type: 'project',
      },
    },
    {
      id: '4',
      title: 'Лекция: Django Framework',
      start: '2025-06-02T10:00:00', // Понедельник
      end: '2025-06-02T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '204',
        type: 'lecture',
      },
    },
    {
      title: 'Домашнее задание: CRUD операции',
      start: '2025-06-04T14:00:00', // Среда
      end: '2025-06-04T17:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '204',
        type: 'homework',
      },
    },
    {
      title: 'Отчет по домашнему заданию',
      start: '2025-06-06T10:00:00', // Пятница
      end: '2025-06-06T12:00:00',
      color: '#ff9800',
      extendedProps: {
        courseId: '204',
        type: 'report',
      },
    },
    {
      id: '5',
      title: 'Лекция: Алгоритмы машинного обучения',
      start: '2025-06-09T10:00:00', // Понедельник
      end: '2025-06-09T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '205',
        type: 'lecture',
      },
    },
    {
      title: 'Практическая сессия: Обучение моделей',
      start: '2025-06-11T14:00:00', // Среда
      end: '2025-06-11T17:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '205',
        type: 'practical',
      },
    },
    {
      title: 'Тестирование навыков студентов',
      start: '2025-06-13T10:00:00', // Пятница
      end: '2025-06-13T12:00:00',
      color: '#ff9800',
      extendedProps: {
        courseId: '205',
        type: 'test',
      },
    },
    {
      id: '6',
      title: 'Лекция: Графовые базы данных Neo4j',
      start: '2025-06-16T10:00:00', // Понедельник
      end: '2025-06-16T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '206',
        type: 'lecture',
      },
    },
    {
      title: 'Практикум: Запросы Cypher',
      start: '2025-06-18T14:00:00', // Среда
      end: '2025-06-18T17:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '206',
        type: 'workshop',
      },
    },
    {
      title: 'Проверка индивидуальных заданий',
      start: '2025-06-20T10:00:00', // Пятница
      end: '2025-06-20T12:00:00',
      color: '#ff9800',
      extendedProps: {
        courseId: '206',
        type: 'checking',
      },
    },
    {
      id: '7',
      title: 'Лекция: Серверная разработка GoLang',
      start: '2025-06-23T10:00:00', // Понедельник
      end: '2025-06-23T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '207',
        type: 'lecture',
      },
    },
    {
      title: 'Проект: REST API на Go',
      start: '2025-06-25T14:00:00', // Среда
      end: '2025-06-25T17:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '207',
        type: 'project',
      },
    },
    {
      title: 'Совместная проверка проекта',
      start: '2025-06-27T10:00:00', // Пятница
      end: '2025-06-27T12:00:00',
      color: '#ff9800',
      extendedProps: {
        courseId: '207',
        type: 'evaluation',
      },
    },
    {
      id: '8',
      title: 'Лекция: DevOps практика CI/CD',
      start: '2025-07-07T10:00:00', // Понедельник
      end: '2025-07-07T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '208',
        type: 'lecture',
      },
    },
    {
      title: 'Практические сессии: GitLab pipelines',
      start: '2025-07-09T14:00:00', // Среда
      end: '2025-07-09T17:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '208',
        type: 'session',
      },
    },
    {
      title: 'Итоговая аттестация',
      start: '2025-07-11T10:00:00', // Пятница
      end: '2025-07-11T12:00:00',
      color: '#ff9800',
      extendedProps: {
        courseId: '208',
        type: 'final',
      },
    },
    {
      id: '9',
      title: 'Лекция: Кибербезопасность',
      start: '2025-07-14T10:00:00', // Понедельник
      end: '2025-07-14T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '209',
        type: 'lecture',
      },
    },
    {
      title: 'Этап защиты дипломных работ',
      start: '2025-07-16T14:00:00', // Среда
      end: '2025-07-16T17:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '209',
        type: 'defense',
      },
    },
    {
      title: 'Закрытие учебного семестра',
      start: '2025-07-18T10:00:00', // Пятница
      end: '2025-07-18T12:00:00',
      color: '#ff9800',
      extendedProps: {
        courseId: '209',
        type: 'closing',
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
