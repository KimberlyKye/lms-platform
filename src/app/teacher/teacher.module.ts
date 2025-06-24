import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherRoutingModule } from './teacher-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeacherCoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { GradingComponent } from './grading/grading.component';
import { StudentsManagementComponent } from './students/students.component';
import { Routes } from '@angular/router';
import { routes } from '../app.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    CommonModule,
    DashboardComponent,
    TeacherCoursesComponent,
    CourseDetailsComponent,
    GradingComponent,
    StudentsManagementComponent,
  ],
})
export class TeacherModule {
  // static getRoutes(): Routes {
  //   return routes;
  //   // return [
  //   //   { path: 'calendar', component: TeacherCalendarComponent },
  //   //   { path: 'courses', component: TeacherCoursesComponent }
  //   // ];
  // }
}
