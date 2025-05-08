export class Person {
  name: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string | Date;

  constructor(
    name: string,
    phoneNumber: string,
    email: string,
    dateOfBirth: string | Date
  ) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.dateOfBirth = dateOfBirth;
  }
}
