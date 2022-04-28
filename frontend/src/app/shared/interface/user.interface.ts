import { Role } from './../enum/enum';
export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  accessToken?: string;
}
