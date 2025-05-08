export interface StudentProgress {
  totalCourses: number;
  avgGradeAll: number;
  courses: {
    id: string;
    name: string;
    progress: number;
    lastGrade?: number;
  }[];
}
