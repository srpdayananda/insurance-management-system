import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment'
import { HttpResponse } from './../../../shared/type/common';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  private API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.apiUrl
  }

  createPolicy(policy: any): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${this.API_URL}/policy`, policy)
  }

  getPolicy(): Observable<HttpResponse> {
    return this.http.get<HttpResponse>(`${this.API_URL}/policy`)
  }
}
