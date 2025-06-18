import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { AppRoutingModule, routes } from './app.routes';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // AppRoutingModule,
    AuthService,
    AuthGuard,
    provideHttpClient(withInterceptorsFromDi()),
  ],
};
