import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { TeacherGuard } from './teacher/teacher.guard';
import { StudentGuard } from './student/student.guard';
import { HomeComponent } from './auth/home/home.component';

export const routes: Routes = [
  // Public routes
  {
    path: 'home',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    component: HomeComponent,
  },

  // Main layout (protected)
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      // Student routes
      {
        path: 'student',
        canActivate: [StudentGuard],
        loadChildren: () =>
          import('./student/student.module').then((m) => m.StudentModule),
      },

      // Teacher routes
      {
        path: 'teacher',
        canActivate: [TeacherGuard],
        loadChildren: () =>
          import('./teacher/teacher.module').then((m) => m.TeacherModule),
      },

      // // Unautorized routes
      // {
      //   path: 'home',
      //   loadChildren: () =>
      //     import('./auth/auth.module').then((m) => m.AuthModule),
      // },

      // Fallback
      { path: '**', redirectTo: '/home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
