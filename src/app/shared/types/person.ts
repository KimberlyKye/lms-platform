import { Entity } from './entity';

export class Person extends Entity {
  name: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string | Date;

  constructor(
    name: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string | Date,
    id?: string
  ) {
    super(id);

    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
  }
}
