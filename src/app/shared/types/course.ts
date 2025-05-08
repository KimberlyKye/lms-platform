import { CourseState } from '../enums/course-state.enum';
import { Duration } from './duration';
import { Entity } from './entity';
import { Lesson } from './lesson';
import { Student } from './student';
import { Teacher } from './teacher';

export class Course extends Entity {
  // Текущее состояние курса (актуальный, архивный)
  state: CourseState;

  // Преподаватель, ведущий курс
  teacher: Teacher;

  // Название курса
  name: string;

  // Описание содержания курса
  description: string;

  // Продолжительность курса (начальная и конечная даты)
  duration: Duration;

  // Список уроков в курсе (только для чтения)
  lessons: Lesson[];

  // Список студентов, зачисленных на курс (только для чтения)
  students: Student[];

  constructor(
    state: CourseState,
    teacher: Teacher,
    name: string,
    description: string,
    duration: Duration,
    lessons: Lesson[],
    students: Student[],
    id?: number
  ) {
    super(id);
    this.state = state;
    this.teacher = teacher;
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.lessons = lessons;
    this.students = students;
  }
}
