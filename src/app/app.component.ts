import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    RouterModule,
    CommonModule,
    // BrowserModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // standalone: true,
})
export class AppComponent {
  title = 'lms-platform';
}
