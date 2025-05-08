import { Duration } from './duration';
import { HomeWork } from './home-work';

export class HomeTask {
  homeTaskName: string;
  description: string;
  duration: Duration;
  material: any;
  homeWorks: HomeWork[];

  // Поля для отображения в списке заданий
  isNew?: boolean; // Новое задание
  hasNewComments?: boolean; // Новые комментарии

  constructor(
    homeTaskName: string,
    description: string,
    duration: Duration,
    material: any,
    homeWorks: HomeWork[],

    isNew?: boolean,
    hasNewComments?: boolean
  ) {
    this.homeTaskName = homeTaskName;
    this.description = description;
    this.duration = duration;
    this.material = material;
    this.homeWorks = homeWorks;

    this.isNew = isNew;
    this.hasNewComments = hasNewComments;
  }
}
