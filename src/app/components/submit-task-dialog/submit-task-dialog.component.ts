import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  inject,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HomeTask } from '../../shared/types/home-task';
import { HomeWork } from '../../shared/types/home-work';
import { FileSizePipe } from '../../shared/pipes/file-size.pipe';
import { MatExpansionModule } from '@angular/material/expansion';

interface DialogData {
  task: HomeTask;
  studentId: string;
}

@Component({
  selector: 'app-submit-task-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FileSizePipe,
    MatExpansionModule,
  ],
  templateUrl: './submit-task-dialog.component.html',
  styleUrl: './submit-task-dialog.component.scss',
})
export class SubmitTaskDialogComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  submitForm: FormGroup;
  selectedFiles: File[] = [];
  previousSubmissions: HomeWork[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SubmitTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.submitForm = this.fb.group({
      comment: [''],
    });

    this.loadPreviousSubmissions();
  }

  // Загрузка предыдущих попыток
  loadPreviousSubmissions() {
    this.previousSubmissions = this.data.task.homeWorks
      .filter((hw) => hw.student.id === this.data.studentId)
      .sort(
        (a, b) =>
          new Date(b.completionDate).getTime() -
          new Date(a.completionDate).getTime()
      );
  }

  // Обработка выбора файлов
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  // Удаление файла
  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  // Отправка задания
  onSubmit() {
    if (this.submitForm.invalid || this.selectedFiles.length === 0) return;

    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('comment', this.submitForm.value.comment);
    formData.append('taskId', this.data.task.homeTaskName);
    formData.append('studentId', this.data.studentId);

    this.dialogRef.close({
      files: this.selectedFiles,
      comment: this.submitForm.value.comment,
      completionDate: new Date().toISOString(),
    });
  }
}
