import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-action-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  templateUrl: './quick-action-card.component.html',
  styleUrl: './quick-action-card.component.scss',
})
export class QuickActionCardComponent {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() count?: number;
  @Input() route!: string;
  @Input() color!: string;

  constructor(private router: Router) {}

  navigate() {
    this.router.navigate([this.route]);
  }
}
