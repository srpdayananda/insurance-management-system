import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.apiUrl;
  }

  create(user: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/user`, user);
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/user`);
  }
}
