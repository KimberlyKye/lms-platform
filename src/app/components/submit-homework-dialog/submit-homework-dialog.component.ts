import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-submit-homework-dialog',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './submit-homework-dialog.component.html',
  styleUrl: './submit-homework-dialog.component.scss',
})
export class SubmitHomeworkDialog {
  readonly dialogRef = inject(MatDialogRef<SubmitHomeworkDialog>);
}
