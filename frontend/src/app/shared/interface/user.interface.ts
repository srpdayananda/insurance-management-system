import { Role } from './../enum/enum';
export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: Role;
  accessToken?: string;
}
