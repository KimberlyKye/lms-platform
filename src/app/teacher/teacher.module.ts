import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherCoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { GradingComponent } from './grading/grading.component';
import { StudentsManagementComponent } from './students/students.component';

@NgModule({
  declarations: [],
  imports: [
    TeacherRoutingModule,
    CommonModule,
    DashboardComponent,
    TeacherCoursesComponent,
    CourseDetailsComponent,
    GradingComponent,
    StudentsManagementComponent,
  ],
})
export class TeacherModule {}
