// Для одного курса
export interface CourseProgress {
  courseName: string;
  completedLessons: number;
  totalLessons: number;
  avgGrade: number;
  lessons: {
    id: string;
    name: string;
    attendanceGrade?: number;
    homeTask?: {
      grade?: number;
      comment?: string;
    };
  }[];
}
