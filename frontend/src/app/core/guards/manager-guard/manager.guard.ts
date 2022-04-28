import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(): boolean {
    if (this.authService.isManager()) {
      return true;
    } else {
      return false;
    }
  }
}
