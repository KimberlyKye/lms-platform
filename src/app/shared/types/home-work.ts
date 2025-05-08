import { Student } from './student';

export class HomeWork {
  student: Student;
  score: number;
  completionDate: string | Date;
  material: any;
  studentComment: string;
  teacherComment: string;

  constructor(
    student: Student,
    score: number,
    completionDate: string | Date,
    material: any,
    studentComment: string,
    teacherComment: string
  ) {
    {
      this.student = student;
      this.score = score;
      this.completionDate = completionDate;
      this.material = material;
      this.studentComment = studentComment;
      this.teacherComment = teacherComment;
    }
  }
}
