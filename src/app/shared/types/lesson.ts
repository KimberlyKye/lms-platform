import { Entity } from './entity';
import { HomeTask } from './home-task';

export class Lesson extends Entity {
  lessonName: string;
  description: string;
  date: string | Date;
  material: any;
  homeTasks: HomeTask[] = [];
  score?: number;

  constructor(
    lessonName: string,
    description: string,
    date: string | Date,
    material?: any,
    score?: number,
    id?: number
  ) {
    super(id);
    this.lessonName = lessonName;
    this.description = description;
    this.date = date;
    this.material = material;
    this.score = score;
    this.homeTasks = [];
  }

  addHomeTask(homeTask: HomeTask): Lesson {
    this.homeTasks.push(homeTask);
    return this;
  }
}
