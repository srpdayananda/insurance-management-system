import { IPolicy } from './../interface/policy.interface';
export type HttpResponse = {
  success: string;
  message: string;
  error?: string;
  policies?: any;
};
