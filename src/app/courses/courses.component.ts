import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Course } from '../shared/types/course';
import { Teacher } from '../shared/types/teacher';
import { Duration } from '../shared/types/duration';
import { CourseState } from '../shared/enums/course-state.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { Lesson } from '../shared/types/lesson';

@Component({
  selector: 'app-courses',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  CourseState = CourseState;
  // Фильтры
  searchQuery = '';
  stateFilter: CourseState | 'all' = 'all';

  // Данные
  allCourses: Course[] = [
    {
      id: '1',
      state: CourseState.Active,
      name: 'Angular Продвинутый',
      description: 'Изучение продвинутых практик Angular',
      teacher: {
        name: 'Иван Петров',
        email: 'ivan@example.com',
        phoneNumber: '+7 (900) 123-45-67',
        dateOfBirth: new Date(1985, 5, 15),
      },
      duration: {
        startDate: new Date(2024, 5, 1),
        endDate: new Date(2024, 7, 30),
      },
      lessons: [
        {
          lessonName: 'Введение в NgRx',
          date: new Date(2024, 5, 1),
          description: 'Основы управления состоянием',
          material: null,
          homeTasks: [],
        } as unknown as Lesson,
      ],
      students: [],
    },
  ];

  ngOnInit() {
    this.loadCourses();
  }

  // Загрузка курсов (заглушка)
  loadCourses() {
    // В реальности: this.courseService.getUserCourses().subscribe(...)
    this.allCourses = this.allCourses;
  }

  // Применение фильтров
  applyFilters() {}

  get filteredCourses(): Course[] {
    return this.allCourses.filter((course) => {
      const matchesSearch = course.name
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());
      const matchesState =
        this.stateFilter === 'all' || course.state === this.stateFilter;
      return matchesSearch && matchesState;
    });
  }

  getCourseProgress(course: Course): number {
    if (!course.lessons.length) return 0;

    const now = new Date();
    const totalDuration =
      new Date(course.duration.endDate).getTime() -
      new Date(course.duration.startDate).getTime();
    const passedDuration =
      now.getTime() - new Date(course.duration.startDate).getTime();

    return Math.min(100, Math.max(0, (passedDuration / totalDuration) * 100));
  }
}
