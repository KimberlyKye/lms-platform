import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnChanges,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChangePasswordComponent } from '../components/change-password/change-password.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Person } from '../shared/types/person';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  // Данные пользователя
  avatarUrl: string | null = null;
  profileForm: FormGroup;
  currentUser: Person | null = null;

  snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: ActivatedRoute
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.email]],
      phone: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.router.url.subscribe(() => {
      this.loadUserData();
    });
  }

  // Загрузка данных пользователя
  loadUserData() {
    this.authService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      if (user) {
        let date = moment(new Date(user.birthDate)).format('YYYY-MM-DD');
        this.profileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phoneNumber,
          birthDate: date,
        });
      }
    });
  }

  // Сохранение профиля
  saveProfile() {
    if (this.profileForm.invalid) return;

    const user: Person = { ...this.currentUser, ...this.profileForm.value };

    this.authService.updateProfile(user).subscribe({
      next: () => {
        // Уведомление об успехе
        this.snackBar.open('Профиль успешно сохранен', 'Закрыть');
      },
      error: (err) => {
        // Уведомление об ошибке
        this.snackBar.open(
          `Профиль не удалось обновить: ${err?.title}`,
          'Закрыть'
        );
      },
    });
  }
}
