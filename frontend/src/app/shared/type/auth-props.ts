import { IUser } from '../interface/user.interface';
import { HttpResponse } from './common';
import { IPolicy } from './../interface/policy.interface';

export type AuthInputProps = {
  email: string;
  password: string;
};

export type AuthResponseProps = HttpResponse & {
  user: IUser;
  policies: IPolicy;
};
