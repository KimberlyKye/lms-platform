import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-submit-task-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './submit-task-dialog.component.html',
  styleUrl: './submit-task-dialog.component.scss',
})
export class SubmitTaskDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SubmitTaskDialogComponent>);

  data: any;
  comment: any;

  fileInput: any;
  selectedFile: any;

  submitTask() {
    throw new Error('Method not implemented.');
  }

  onFileSelected($event: Event) {
    throw new Error('Method not implemented.');
  }
}
