import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ChangePasswordComponent,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  providers: [AuthService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  // Данные пользователя
  avatarUrl: string | null = null;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.email]],
      phone: ['', [Validators.pattern(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)]],
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  // Загрузка данных пользователя
  loadUserData() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.profileForm.patchValue({
        name: user.name,
        email: user.email,
        phone: user.phone,
      });
      this.avatarUrl = user.avatarUrl;
    });
  }

  // Сохранение профиля
  saveProfile() {
    if (this.profileForm.invalid) return;

    this.authService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        // Уведомление об успехе
      },
      error: () => {
        // Уведомление об ошибке
      },
    });
  }

  // Смена аватарки
  changeAvatar() {
    // Логика загрузки файла
  }
}
