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

  // Календарь занятий для студентов на май-июнь-июль 2025

  events: EventInput[] = [
    {
      id: '1',
      title: 'Лекция: Введение в IT-технологии',
      start: '2025-05-01T10:00:00', // Четверг
      end: '2025-05-01T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '301',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Установка среды разработки',
      start: '2025-05-01T14:00:00', // Четверг
      end: '2025-05-01T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '301',
        type: 'practice',
      },
    },
    {
      id: '2',
      title: 'Лекция: Основы программирования на Python',
      start: '2025-05-04T10:00:00', // Воскресенье
      end: '2025-05-04T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '302',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Первая программа на Python',
      start: '2025-05-04T14:00:00', // Воскресенье
      end: '2025-05-04T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '302',
        type: 'practice',
      },
    },
    {
      id: '3',
      title: 'Лекция: Основы баз данных SQL',
      start: '2025-05-08T10:00:00', // Четверг
      end: '2025-05-08T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '303',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Запросы SELECT',
      start: '2025-05-08T14:00:00', // Четверг
      end: '2025-05-08T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '303',
        type: 'practice',
      },
    },
    {
      id: '4',
      title: 'Лекция: Веб-разработка с Flask',
      start: '2025-05-11T10:00:00', // Воскресенье
      end: '2025-05-11T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '304',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Простое приложение на Flask',
      start: '2025-05-11T14:00:00', // Воскресенье
      end: '2025-05-11T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '304',
        type: 'practice',
      },
    },
    {
      id: '5',
      title: 'Лекция: Тестирование ПО',
      start: '2025-05-15T10:00:00', // Четверг
      end: '2025-05-15T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '305',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Автоматизация тестов',
      start: '2025-05-15T14:00:00', // Четверг
      end: '2025-05-15T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '305',
        type: 'practice',
      },
    },
    {
      id: '6',
      title: 'Лекция: Основы Data Science',
      start: '2025-05-18T10:00:00', // Воскресенье
      end: '2025-05-18T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '306',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Анализ данных на Jupyter Notebook',
      start: '2025-05-18T14:00:00', // Воскресенье
      end: '2025-05-18T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '306',
        type: 'practice',
      },
    },
    {
      id: '7',
      title: 'Лекция: Микросервисная архитектура',
      start: '2025-05-22T10:00:00', // Четверг
      end: '2025-05-22T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '307',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Разделение монолита на микросервисы',
      start: '2025-05-22T14:00:00', // Четверг
      end: '2025-05-22T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '307',
        type: 'practice',
      },
    },
    {
      id: '8',
      title: 'Лекция: Принципы Agile и Scrum',
      start: '2025-05-25T10:00:00', // Воскресенье
      end: '2025-05-25T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '308',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Планирование спринтов',
      start: '2025-05-25T14:00:00', // Воскресенье
      end: '2025-05-25T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '308',
        type: 'practice',
      },
    },
    {
      id: '9',
      title: 'Лекция: Docker контейнеризация',
      start: '2025-05-29T10:00:00', // Четверг
      end: '2025-05-29T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '309',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Сборка первого контейнера',
      start: '2025-05-29T14:00:00', // Четверг
      end: '2025-05-29T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '309',
        type: 'practice',
      },
    },
    {
      id: '10',
      title: 'Лекция: Сети и протоколы интернета',
      start: '2025-06-01T10:00:00', // Воскресенье
      end: '2025-06-01T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '310',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Настройка сети',
      start: '2025-06-01T14:00:00', // Воскресенье
      end: '2025-06-01T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '310',
        type: 'practice',
      },
    },
    {
      id: '11',
      title: 'Лекция: Машинное обучение на TensorFlow',
      start: '2025-06-05T10:00:00', // Четверг
      end: '2025-06-05T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '311',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Нейронные сети',
      start: '2025-06-05T14:00:00', // Четверг
      end: '2025-06-05T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '311',
        type: 'practice',
      },
    },
    {
      id: '12',
      title: 'Лекция: Cloud Computing AWS/Azure/GCP',
      start: '2025-06-08T10:00:00', // Воскресенье
      end: '2025-06-08T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '312',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Deployment на облачных платформах',
      start: '2025-06-08T14:00:00', // Воскресенье
      end: '2025-06-08T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '312',
        type: 'practice',
      },
    },
    {
      id: '13',
      title: 'Лекция: Основы кибербезопасности',
      start: '2025-06-12T10:00:00', // Четверг
      end: '2025-06-12T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '313',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Атаки и защита',
      start: '2025-06-12T14:00:00', // Четверг
      end: '2025-06-12T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '313',
        type: 'practice',
      },
    },
    {
      id: '14',
      title: 'Лекция: Оптимизация производительности приложений',
      start: '2025-06-15T10:00:00', // Воскресенье
      end: '2025-06-15T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '314',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Профилирование и оптимизация',
      start: '2025-06-15T14:00:00', // Воскресенье
      end: '2025-06-15T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '314',
        type: 'practice',
      },
    },
    {
      id: '15',
      title: 'Лекция: Современные инструменты разработчика',
      start: '2025-06-19T10:00:00', // Четверг
      end: '2025-06-19T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '315',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Инструменты IDE и CLI',
      start: '2025-06-19T14:00:00', // Четверг
      end: '2025-06-19T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '315',
        type: 'practice',
      },
    },
    {
      id: '16',
      title: 'Лекция: DevOps Automation',
      start: '2025-06-22T10:00:00', // Воскресенье
      end: '2025-06-22T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '316',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Использование Ansible',
      start: '2025-06-22T14:00:00', // Воскресенье
      end: '2025-06-22T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '316',
        type: 'practice',
      },
    },
    {
      id: '17',
      title: 'Лекция: Мониторинг и логирование',
      start: '2025-06-26T10:00:00', // Четверг
      end: '2025-06-26T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '317',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Grafana и Prometheus',
      start: '2025-06-26T14:00:00', // Четверг
      end: '2025-06-26T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '317',
        type: 'practice',
      },
    },
    {
      id: '18',
      title: 'Лекция: Программирование на C++',
      start: '2025-06-29T10:00:00', // Воскресенье
      end: '2025-06-29T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '318',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Hello World на C++',
      start: '2025-06-29T14:00:00', // Воскресенье
      end: '2025-06-29T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '318',
        type: 'practice',
      },
    },
    {
      id: '19',
      title: 'Лекция: Финансовая аналитика Excel',
      start: '2025-07-03T10:00:00', // Четверг
      end: '2025-07-03T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '319',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Макросы VBA',
      start: '2025-07-03T14:00:00', // Четверг
      end: '2025-07-03T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '319',
        type: 'practice',
      },
    },
    {
      id: '20',
      title: 'Лекция: Blockchain технология',
      start: '2025-07-06T10:00:00', // Воскресенье
      end: '2025-07-06T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '320',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Ethereum Smart Contracts',
      start: '2025-07-06T14:00:00', // Воскресенье
      end: '2025-07-06T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '320',
        type: 'practice',
      },
    },
    {
      id: '21',
      title: 'Лекция: Мобильная разработка Android/iOS',
      start: '2025-07-10T10:00:00', // Четверг
      end: '2025-07-10T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '321',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Первое мобильное приложение',
      start: '2025-07-10T14:00:00', // Четверг
      end: '2025-07-10T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '321',
        type: 'practice',
      },
    },
    {
      id: '22',
      title: 'Лекция: Проектирование UI/UX интерфейсов',
      start: '2025-07-13T10:00:00', // Воскресенье
      end: '2025-07-13T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '322',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Prototyping in Figma',
      start: '2025-07-13T14:00:00', // Воскресенье
      end: '2025-07-13T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '322',
        type: 'practice',
      },
    },
    {
      id: '23',
      title: 'Лекция: Интернет вещей IoT',
      start: '2025-07-17T10:00:00', // Четверг
      end: '2025-07-17T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '323',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Arduino проекты',
      start: '2025-07-17T14:00:00', // Четверг
      end: '2025-07-17T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '323',
        type: 'practice',
      },
    },
    {
      id: '24',
      title: 'Лекция: Базы данных NoSQL',
      start: '2025-07-20T10:00:00', // Воскресенье
      end: '2025-07-20T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '324',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: MongoDB и Redis',
      start: '2025-07-20T14:00:00', // Воскресенье
      end: '2025-07-20T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '324',
        type: 'practice',
      },
    },
    {
      id: '25',
      title: 'Лекция: Биометрия и распознавание лиц',
      start: '2025-07-24T10:00:00', // Четверг
      end: '2025-07-24T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '325',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: OpenCV face detection',
      start: '2025-07-24T14:00:00', // Четверг
      end: '2025-07-24T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '325',
        type: 'practice',
      },
    },
    {
      id: '26',
      title: 'Лекция: Искусственный интеллект NLP',
      start: '2025-07-27T10:00:00', // Воскресенье
      end: '2025-07-27T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '326',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Chatbot на Python',
      start: '2025-07-27T14:00:00', // Воскресенье
      end: '2025-07-27T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '326',
        type: 'practice',
      },
    },
    {
      id: '27',
      title: 'Лекция: Cybersecurity Threats',
      start: '2025-07-31T10:00:00', // Четверг
      end: '2025-07-31T12:00:00',
      color: '#3f51b5',
      extendedProps: {
        courseId: '327',
        type: 'lecture',
      },
    },
    {
      title: 'Практика: Penetration Testing',
      start: '2025-07-31T14:00:00', // Четверг
      end: '2025-07-31T16:00:00',
      color: '#ffeb3b',
      extendedProps: {
        courseId: '327',
        type: 'practice',
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
