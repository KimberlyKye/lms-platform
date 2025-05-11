import { MatExpansionModule } from '@angular/material/expansion';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../shared/types/course';
import { CourseService } from '../course.service';
import { SubmitTaskDialogComponent } from '../../components/submit-task-dialog/submit-task-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskStatus } from '../../shared/types/task-status';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HomeTask } from '../../shared/types/home-task';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../auth/auth.service';
import { HomeWork } from '../../shared/types/home-work';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  providers: [CourseService, UserService, AuthService],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    RouterModule,
  ],
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  activeTaskId: string | null = null;
  taskFilter = 'active';
  allTasks: Array<any> = [];
  filteredTasks: Array<any> = [];
  newTasksCount = 0;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.loadCourse(courseId);
    }
  }

  loadCourse(id: string) {
    this.courseService.getCourseById(id).subscribe({
      next: (course) => {
        this.course = course;
        this.prepareTasksList();
      },
      error: () => {
        // Обработка ошибки
      },
    });
  }

  getCourseProgress(): number {
    if (!this.course) return 0;

    const now = new Date();
    const totalDuration =
      new Date(this.course.duration.endDate).getTime() -
      new Date(this.course.duration.startDate).getTime();
    const passedDuration =
      now.getTime() - new Date(this.course.duration.startDate).getTime();

    return Math.min(100, Math.max(0, (passedDuration / totalDuration) * 100));
  }

  getProgressColor(): string {
    const progress = this.getCourseProgress();
    return progress > 75 ? 'primary' : progress > 30 ? 'accent' : 'warn';
  }

  openTaskDialog(task: HomeTask) {
    const dialogRef = this.dialog.open(SubmitTaskDialogComponent, {
      width: '800px',
      data: {
        task: task,
        studentId: this.currentUser?.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.submitHomework(task, result);
      }
    });
  }

  submitHomework(task: HomeTask, result: any) {
    throw new Error('Method not implemented.');
  }

  prepareTasksList() {
    this.allTasks =
      this.course?.lessons.flatMap((lesson) =>
        lesson.homeTasks.map((task) => ({
          ...task,
          lessonId: lesson.id,
        }))
      ) || [];

    this.filterTasks();
  }

  filterTasks() {
    this.filteredTasks = this.allTasks.filter((task) => {
      if (this.taskFilter === 'all') return true;
      if (this.taskFilter === 'active') return !task.isSubmitted;
      if (this.taskFilter === 'completed') return task.isSubmitted;
      if (this.taskFilter === 'late') return this.isTaskLate(task.deadline);
      return true;
    });
  }

  getTaskStatusClass(task: any): TaskStatus {
    if (task.isSubmitted) return 'completed';
    return this.isTaskLate(task.deadline) ? 'late' : 'active';
  }

  getTaskIcon(task: any): string {
    if (task.isSubmitted) return 'check_circle';
    return this.isTaskLate(task.deadline) ? 'warning' : 'schedule';
  }

  isTaskLate(deadline: Date): boolean {
    return new Date() > new Date(deadline);
  }

  getLessonNumber(lessonId: string): number {
    return (this.course?.lessons.findIndex((l) => l.id === lessonId) || 0) + 1;
  }

  navigateToTask(task: any) {
    this.activeTaskId = task.id;
    const element = document.getElementById(`task-${task.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.classList.add('highlight');
      setTimeout(() => element.classList.remove('highlight'), 2000);
    }
  }

  // Получаем работу текущего студента
  getStudentWork$(task: HomeTask): Observable<HomeWork | null> {
    return this.authService.getCurrentUser().pipe(
      map((user) => {
        if (user) {
          const currentStudentId = user.id;
          const studentWork = task.homeWorks.find(
            (hw) => hw.student.id === currentStudentId
          );
          return studentWork ?? null;
        }

        return null;
      })
    );
  }

  // Проверка новых элементов
  checkForNewItems() {
    this.newTasksCount = this.allTasks.filter(
      (task) => this.isTaskNew(task) || this.hasNewComments(task)
    ).length;
  }

  isTaskNew(task: HomeTask): boolean {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return new Date(task.duration.startDate) > threeDaysAgo;
  }

  hasNewComments(task: HomeTask): Observable<boolean> {
    return this.getStudentWork$(task).pipe(
      map((workRes) => {
        const work = workRes;

        if (!work) return false;

        const lastViewed =
          this.userService.getLastCommentView(task.homeTaskName) ?? '';
        return !!(
          work.teacherComment &&
          new Date(work.completionDate) > new Date(lastViewed)
        );
      })
    );
  }

  getWorkScore$(task: HomeTask): Observable<string> {
    return this.getStudentWork$(task).pipe(
      map((workRes) => {
        const work = workRes;
        if (!work) return '';
        return work.score ? `${work.score}` : '-0';
      })
    );
  }

  openTask(task: HomeTask) {
    // Помечаем как просмотренное
    if (task.isNew) {
      task.isNew = false;
      this.newTasksCount--;
    }

    // Обновляем время просмотра комментариев
    if (task.hasNewComments) {
      this.userService.updateLastCommentView(
        task.homeTaskName,
        new Date().toISOString()
      );
      task.hasNewComments = false;
      this.newTasksCount--;
    }
  }
}
