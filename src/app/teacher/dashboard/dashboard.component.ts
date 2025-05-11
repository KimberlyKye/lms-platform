import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { TeacherService } from '../teacher.service';
import { QuickActionCardComponent } from '../quick-action-card/quick-action-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RealTimeService } from '../../services/real-time.service';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    QuickActionCardComponent,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    RouterModule,
    MatButtonModule,
  ],
  providers: [TeacherService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  @ViewChild('activityChart') activityChartRef!: any;

  teacherName = 'Алексей Петров';
  today = new Date();

  stats = {
    pendingAssignments: 0,
    totalStudents: 0,
    activeCourses: 0,
  };

  recentSubmissions = [
    {
      studentName: 'Иван Сидоров',
      courseName: 'Angular Basics',
      date: new Date(),
      isNew: true,
    },
    // ...
  ];

  upcomingDeadlines = [
    {
      courseId: '1',
      courseName: 'React Advanced',
      taskName: 'Финальный проект',
      date: new Date('2024-06-25'),
      description: 'Завершите все задачи проекта',
    },
    // ...
  ];
  avatarUrl: any;
  activityChart: any;
  interval: any;

  constructor(
    private teacherService: TeacherService,
    private authService: AuthService,
    private rtService: RealTimeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTeacherProfile();
    this.loadDashboardStats();
    this.initActivityChart();
    this.loadRecentSubmissions();
    this.loadUpcomingDeadlines();
  }
  loadRecentSubmissions() {
    throw new Error('Method not implemented.');
  }
  private loadTeacherProfile() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.teacherName = user.fullName ?? this.teacherName;
      // Загрузка аватара, если есть
      if (user.avatarUrl) {
        this.avatarUrl = user.avatarUrl;
      }
    });
  }

  private loadDashboardStats() {
    this.teacherService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (err) => {
        console.error('Ошибка загрузки статистики:', err);
        this.snackBar.open('Не удалось загрузить статистику', 'Закрыть');
      },
    });
  }

  private initActivityChart() {
    this.teacherService.getStudentActivity().subscribe((activityData) => {
      const config: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: activityData.labels,
          datasets: [
            {
              label: 'Активность студентов',
              data: activityData.values,
              backgroundColor: 'rgba(63, 81, 181, 0.7)',
              borderColor: 'rgba(63, 81, 181, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      };

      this.activityChart = new Chart(
        this.activityChartRef.nativeElement,
        config
      );
    });
  }

  private loadUpcomingDeadlines() {
    this.teacherService.getUpcomingDeadlines().subscribe({
      next: (deadlines) => {
        this.upcomingDeadlines = deadlines.map((d: any) => ({
          ...d,
          daysLeft: this.calculateDaysLeft(d.date),
        }));
      },
    });
  }

  private calculateDaysLeft(deadline: string): number {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return Math.ceil(
      (deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );
  }

  handleNewSubmission(submission: any) {
    // Добавляем в начало списка
    this.recentSubmissions.unshift({
      ...submission,
      isNew: true,
    });

    // Обновляем счетчик
    this.stats.pendingAssignments++;

    // Показываем уведомление
    this.snackBar
      .open(`Новая работа от ${submission.studentName}`, 'Открыть', {
        duration: 5000,
      })
      .onAction()
      .subscribe(() => {
        this.router.navigate(['/teacher/grading']);
      });
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
    this.rtService.unsubscribe();
  }

  navigateToGrading() {
    if (this.stats.pendingAssignments > 0) {
      this.router.navigate(['/teacher/grading']);
    } else {
      this.snackBar.open('Нет работ на проверку', 'OK', { duration: 3000 });
    }
  }

  loadStats() {
    this.teacherService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
    });
  }

  initCharts() {
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        datasets: [
          {
            label: 'Сдачи работ',
            data: [12, 19, 8, 15, 7, 3, 9],
            backgroundColor: 'rgba(63, 81, 181, 0.7)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    };

    new Chart(this.activityChartRef.nativeElement, config);
  }
}
