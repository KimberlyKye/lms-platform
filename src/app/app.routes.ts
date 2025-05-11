import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { TeacherGuard } from './teacher/teacher.guard';

const routes: Routes = [
  // Public routes
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  // Main layout (protected)
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      // Common routes (for all authenticated users)
      {
        path: '',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainModule),
      },

      // Teacher routes
      {
        path: 'teacher',
        // canActivate: [TeacherGuard],
        loadChildren: () =>
          import('./teacher/teacher.module').then((m) => m.TeacherModule),
      },

      // Fallback
      { path: '**', redirectTo: '/courses' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
