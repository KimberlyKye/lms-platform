import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../shared/types/course';
import { Duration } from '../shared/types/duration';
import { CourseState } from '../shared/enums/course-state.enum';
import { Teacher } from '../shared/types/teacher';
import { Lesson } from '../shared/types/lesson';
import { HomeTask } from '../shared/types/home-task';
import { HttpClient } from '@angular/common/http';
import { CourseProgress } from '../shared/types/course-progress';
import { StudentProgress } from '../shared/types/student-progress';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getCourseProgress(courseId: string): Observable<CourseProgress> {
    return this.http.get<CourseProgress>(`/api/progress/${courseId}`);
  }

  getAllProgress(): Observable<StudentProgress> {
    return this.http.get<StudentProgress>('/api/students/progress');
  }

  getCourseById(id: string): Observable<Course> {
    let course: Course = {
      id: id,
      name: 'Angular',
      description:
        'Новое поколение фреймворков выбирает свое название из названия самого первоначального фреймворка AngularJS. ',
      duration: new Duration(new Date('2025-01-01'), new Date('2025-02-01')),
      state: CourseState.Active,
      teacher: new Teacher(
        'Иванов Иван Иванович',
        '+79998887766',
        'ivanov@example.com',
        new Date('1985-05-05')
      ),
      lessons: [
        new Lesson(
          'Основы',
          'Введение в Angular',
          new Date('2025-01-01')
        ).addHomeTask(
          new HomeTask(
            'Написать программу на Angular',
            'Приложение должно содержать компоненты, сервисы, маршрутизацию и использование инжектирования зависимостей.',
            new Duration(new Date('2025-01-01'), new Date('2025-01-02')),
            null,
            [],
            false,
            true
          )
        ),
        new Lesson(
          'Интерфейсы',
          'Создание интерфейсов',
          new Date('2025-01-02')
        ).addHomeTask(
          new HomeTask(
            'Создать интерфейс',
            'Создать интерфейс, который будет описывать структуру объекта, содержащего информацию о пользователе.',
            new Duration(new Date('2025-01-02'), new Date('2025-01-03')),
            null,
            [],
            true,
            false
          )
        ),
        new Lesson(
          'Компоненты',
          'Создание компонентов',
          new Date('2025-01-03')
        ),
        new Lesson(
          'Роутинг',
          'Настройка роутинга в Angular',
          new Date('2025-01-04')
        ),
        new Lesson('Сервисы', 'Создание сервисов', new Date('2025-01-05')),
        new Lesson('Формы', 'Создание форм', new Date('2025-01-06')),
        new Lesson(
          'Инжектирование зависимостей',
          'Введение в DI',
          new Date('2025-01-07')
        ),
        new Lesson('Пайпы', 'Создание пайпов', new Date('2025-01-08')),
        new Lesson(
          'Привязка событий',
          'Создание обработчиков событий',
          new Date('2025-01-09')
        ),
        new Lesson('Стили', 'Создание стилей', new Date('2025-01-10')),
        new Lesson(
          'События мыши',
          'Создание обработчиков событий мыши',
          new Date('2025-01-11')
        ),
        new Lesson(
          'События клавиатуры',
          'Создание обработчиков событий клавиатуры',
          new Date('2025-01-12')
        ),
        new Lesson(
          'События тачскринов',
          'Создание обработчиков событий тачскринов',
          new Date('2025-01-13')
        ),
        new Lesson(
          'События ввода',
          'Создание обработчиков событий ввода',
          new Date('2025-01-14')
        ),
        new Lesson(
          'События фокуса',
          'Создание обработчиков событий фокуса',
          new Date('2025-01-15')
        ),
        new Lesson(
          'События изменения',
          'Создание обработчиков событий изменения',
          new Date('2025-01-16')
        ),
        new Lesson(
          'События загрузки',
          'Создание обработчиков событий загрузки',
          new Date('2025-01-17')
        ),
        new Lesson(
          'События отмены',
          'Создание обработчиков событий отмены',
          new Date('2025-01-18')
        ),
        new Lesson(
          'События нажатия',
          'Создание обработчиков событий нажатия',
          new Date('2025-01-19')
        ),
        new Lesson(
          'События перетаскивания',
          'Создание обработчиков событий перетаскивания',
          new Date('2025-01-20')
        ),
        new Lesson(
          'События скролла',
          'Создание обработчиков событий скролла',
          new Date('2025-01-21')
        ),
      ],
      students: [],
    };
    return of(course);
  }
}
