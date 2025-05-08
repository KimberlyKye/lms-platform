export class Duration {
  startDate: Date | string;
  endDate: Date | string;

  constructor(startDate: Date, endDate: Date) {
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
