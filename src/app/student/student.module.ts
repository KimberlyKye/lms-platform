import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student.routing.module';
import { Routes } from '@angular/router';
import { routes } from '../app.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, StudentRoutingModule],
})
export class StudentModule {
  // static getRoutes(): Routes {
  //   return routes;
  //   // return [
  //   //   { path: 'calendar', component: TeacherCalendarComponent },
  //   //   { path: 'courses', component: TeacherCoursesComponent }
  //   // ];
  // }
}
