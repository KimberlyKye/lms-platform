import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { CoursesComponent } from './courses/courses.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/:id', component: CourseDetailsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'progress', component: ProgressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
