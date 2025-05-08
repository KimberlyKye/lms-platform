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

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  providers: [CourseService],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatExpansionModule, MatProgressSpinnerModule],
})
export class CourseDetailsComponent implements OnInit {
  course: Course | null = null;

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
}
