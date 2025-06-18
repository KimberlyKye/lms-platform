import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeTask } from '../../shared/types/home-task';

@Component({
  selector: 'app-grading',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './grading.component.html',
  styleUrl: './grading.component.scss',
})
export class GradingComponent {
  gradingForm!: FormGroup<any>;
  pendingTasks: any;
  selectedCourse: any;
  courses: any;

  submitGrade(task: HomeTask) {
    throw new Error('Method not implemented.');
  }
}
