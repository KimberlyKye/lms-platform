import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

@Component({
  selector: 'app-progress',
  imports: [CommonModule, MatIconModule, MatExpansionModule, MatCardModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.scss',
})
export class ProgressComponent {
  @ViewChild('progressChart', { static: true }) progressChartRef: any;
  chart: Chart | null;

  constructor() {
    this.chart = null;
    Chart.register(...registerables);
  }

  // Данные для примера
  course = {
    title: 'Angular Basics',
    lessons: [
      {
        lessonNumber: 1,
        lessonName: 'Введение',
        attendanceGrade: 90,
        homeTask: {
          grade: 85,
          teacherComment:
            'Хорошая работа, но есть небольшие ошибки в компонентах',
        },
      },
      // ... другие уроки
    ],
  };

  get completedLessons(): number {
    return this.course.lessons.filter((l) => l.attendanceGrade !== null).length;
  }

  get totalLessons(): number {
    return this.course.lessons.length;
  }

  get avgGrade(): number | null {
    const grades = this.course.lessons
      .map((l) => l.attendanceGrade)
      .filter((g) => g !== null);
    return grades.length
      ? Math.round(grades.reduce((a, b) => a + b, 0) / grades.length)
      : null;
  }

  get overdueTasks(): number {
    return 0; // Логика расчёта просроченных заданий
  }

  ngAfterViewInit() {
    this.initChart();
  }

  initChart() {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.course.lessons.map((l) => `Урок ${l.lessonNumber}`),
        datasets: [
          {
            label: 'Оценки',
            data: this.course.lessons.map((l) => l.attendanceGrade),
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63, 81, 181, 0.1)',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 100,
          },
        },
      },
    };

    this.chart = new Chart(this.progressChartRef.nativeElement, config);
  }

  getGradeClass(grade: number | null): string {
    if (!grade) return 'none';
    if (grade >= 90) return 'excellent';
    if (grade >= 75) return 'good';
    if (grade >= 60) return 'satisfactory';
    return 'poor';
  }

  getLessonStatus(lesson: any): string {
    if (!lesson.attendanceGrade) return 'Не завершён';
    return lesson.homeTask?.grade ? 'ДЗ сдано' : 'Без ДЗ';
  }

  getLessonStatusClass(lesson: any): string {
    if (!lesson.attendanceGrade) return 'status-not-started';
    return lesson.homeTask?.grade ? 'status-completed' : 'status-partial';
  }
}
