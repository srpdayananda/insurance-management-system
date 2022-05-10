import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AUTH_TOKEN } from './../../../constructor/app.constructor';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = localStorage.getItem(AUTH_TOKEN);

    request = request.clone({
      setHeaders: { Authorization: `${accessToken}` },
    });
    return next.handle(request);
  }
}
