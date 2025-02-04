export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  description: string;
  role: UserRole;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}
