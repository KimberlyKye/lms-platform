import { Duration } from './duration';
import { HomeWork } from './home-work';

export class HomeTask {
  homeTaskName: string;
  description: string;
  duration: Duration;
  material: any;
  homeWorks: HomeWork[];

  constructor(
    homeTaskName: string,
    description: string,
    duration: Duration,
    material: any,
    homeWorks: HomeWork[]
  ) {
    this.homeTaskName = homeTaskName;
    this.description = description;
    this.duration = duration;
    this.material = material;
    this.homeWorks = homeWorks;
  }
}
