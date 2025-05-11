import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  getStudentActivity(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getUpcomingDeadlines(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}

  getPendinganys(): Observable<any[]> {
    return this.http.get<any[]>('/api/teacher/assignments/pending');
  }

  submitGrade(gradeData: {
    assignmentId: string;
    grade: number;
    comment: string;
  }): Observable<void> {
    return this.http.post<void>('/api/teacher/grades', gradeData);
  }

  getCourseStatistics(courseId: string): Observable<any> {
    return this.http.get<any>(`/api/teacher/courses/${courseId}/stats`);
  }

  getDashboardStats(): Observable<{
    pendingAssignments: number;
    totalStudents: number;
    activeCourses: number;
  }> {
    return this.http.get<any>('/api/teacher/dashboard/stats');
  }

  getRecentSubmissions(): Observable<
    Array<{
      studentName: string;
      courseName: string;
      date: Date;
      isNew: boolean;
    }>
  > {
    return this.http.get<any>('/api/teacher/dashboard/recent-submissions');
  }
}
