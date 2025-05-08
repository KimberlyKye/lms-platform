import { MatExpansionModule } from '@angular/material/expansion';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  providers: [CourseService],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule
  ],
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;
  activeTaskId: string | null = null;
  taskFilter = 'active';
  allTasks: Array<any> = [];
  filteredTasks: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private dialog: MatDialog
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

  openTaskDialog(task: any) {
    this.dialog.open(SubmitTaskDialogComponent, {
      data: { task },
      width: '600px',
    });
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
}
