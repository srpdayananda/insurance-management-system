import { IUser } from '../interface/user.interface';
import { HttpResponse } from './common';

export type AuthInputProps = {
  email: string;
  password: string;
};

export type AuthResponseProps = HttpResponse & {
  user: IUser;
};
