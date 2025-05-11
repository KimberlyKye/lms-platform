import { Person } from './person';

export class Student extends Person {
  name: string = this.firstName + ' ' + this.lastName;

  constructor(
    name: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string | Date,
    id?: string
  ) {
    super(
      name.split(' ')[0],
      name.split(' ')[1],
      phoneNumber,
      email,
      dateOfBirth,
      id
    );

    this.firstName = name.split(' ')[0];
    this.lastName = name.split(' ')[1];
  }
}
