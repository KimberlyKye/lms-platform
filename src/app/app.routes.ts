import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { TeacherGuard } from './teacher/teacher.guard';
import { StudentGuard } from './student/student.guard';
import { HomeComponent } from './auth/home/home.component';
import { RoleRouterGuard } from './role-router.guard';

export const routes: Routes = [
  // Public routes
  {
    path: 'home',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    component: HomeComponent,
  },

  // // Role-based lazy loading
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       canActivate: [RoleRouterGuard],
  //       children: [], // Динамическая загрузка в guard
  //     },
  //     { path: '**', redirectTo: '/calendar' }, // Fallback
  //   ],
  // },

  // Main layout (protected)
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      // Student only routes
      // {
      //   path: '',
      //   canActivate: [StudentGuard],
      //   loadChildren: () =>
      //     import('./student/student.module').then((m) => m.StudentModule),
      // },

      // Teacher only routes
      {
        path: '',
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
