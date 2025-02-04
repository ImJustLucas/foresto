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

export interface Profile {
  created_at: string;
  date_of_birth: string | null;
  description: string;
  first_name: string;
  id: string;
  last_name: "";
  role: UserRole;
}
