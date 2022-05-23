import { HttpResponse } from './../../../shared/type/common';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  createUser(user: any): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.API_URL}/user`, user);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/user`);
  }

  updateUser(user: any): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(`${this.API_URL}/user`, user)
  }
  
  deleteUser(id: string): Observable<HttpResponse> {
    const params = new HttpParams().append('id', id);
    return this.http.delete<HttpResponse>(`${this.API_URL}/user`, { params })
  }
}
