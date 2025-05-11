import { Entity } from './entity';

export class Person extends Entity {
  firstName?: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
  birthDate: string | Date;

  constructor(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string | Date,
    id?: string
  ) {
    super(id);

    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.birthDate = dateOfBirth;
  }
}
