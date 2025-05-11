import { RouterModule, Routes } from '@angular/router';
import { GradingComponent } from './grading/grading.component';
import { TeacherCoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from '../main/courses/course-details/course-details.component';
import { StudentsManagementComponent } from './students/students.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'courses', component: TeacherCoursesComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'grading', component: GradingComponent },
  { path: 'students', component: StudentsManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
