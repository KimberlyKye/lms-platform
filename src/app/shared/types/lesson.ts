import { HomeTask } from './home-task';

export class Lesson {
  lessonName: string;
  description: string;
  date: string | Date;
  material: any;
  homeTasks: HomeTask[];

  constructor(
    lessonName: string,
    description: string,
    date: string | Date,
    material?: any
  ) {
    this.lessonName = lessonName;
    this.description = description;
    this.date = date;
    this.material = material;
    this.homeTasks = [];
  }
}
