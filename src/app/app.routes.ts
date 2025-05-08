import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';
import { CourseDetailsComponent } from './courses/course-details/course-details.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CoursesComponent } from './courses/courses.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: HomeComponent,
  },
];
