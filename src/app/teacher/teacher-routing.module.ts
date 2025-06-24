import { RouterModule, Routes } from '@angular/router';
import { GradingComponent } from './grading/grading.component';
import { TeacherCoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { StudentsManagementComponent } from './students/students.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { TeacherProfileComponent } from './profile/profile.component';
import { TeacherCalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'calendar', component: TeacherCalendarComponent },
  { path: 'profile', component: TeacherProfileComponent },
  { path: 'courses', component: TeacherCoursesComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'grading', component: GradingComponent },
  { path: 'students', component: StudentsManagementComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
