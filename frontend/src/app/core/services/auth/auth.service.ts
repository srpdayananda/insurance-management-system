import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  AuthResponseProps,
  AuthInputProps,
} from 'src/app/shared/type/auth-props';

import { environment } from 'src/environments/environment';

import { AUTH_USER } from 'src/app/constant/constant';
import { Role } from '../../../shared/enum/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.apiUrl;
  }

  login(props: AuthInputProps): Observable<AuthResponseProps> {
    return this.http.post<AuthResponseProps>(`${this.API_URL}/login`, props);
  }

  isManager() {
    const authUser = localStorage.getItem(AUTH_USER);
    const user = JSON.parse(authUser!);
    return user.role === Role.MANAGER;
  }
}
