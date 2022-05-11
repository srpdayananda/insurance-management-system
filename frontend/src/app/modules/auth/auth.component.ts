import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthResponseProps } from 'src/app/shared/type/auth-props';
import { Role } from 'src/app/shared/enum/enum';
import { AUTH_TOKEN } from 'src/app/constant/constant';
import { AUTH_USER } from '../../constant/constant';
import { DataService } from './../../core/services/data/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  loginClickedHandler(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (response: AuthResponseProps) => {
        if (response.success && response.user?.accessToken) {
          this.toastr.success(response.message, 'Success!');
          localStorage.setItem(AUTH_TOKEN, response.user.accessToken);

          const { id, email, firstName, lastName, role } = response.user;
          this.dataService.setIsLoggedIn(true);
          this.dataService.setLoggedUser({
            id,
            email,
            firstName,
            lastName,
            role,
          });
          if (role === Role.MANAGER) {
            this.router.navigate(['manager']);
          } else if (role === Role.ADVISOR) {
            this.router.navigate(['advisor']);
          }
        } else {
          this.toastr.error('Login Failed');
        }
      },
      (err) => {
        if (err?.error?.error) {
          this.toastr.error(err?.error?.error, 'Error!');
        }
      }
    );
  }
}
