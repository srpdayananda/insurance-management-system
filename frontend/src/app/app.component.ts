import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_TOKEN } from './constant/constant';
import { AUTH_USER } from './constant/constant';
import { Role } from 'src/app/shared/enum/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem(AUTH_TOKEN);
    const authUser = localStorage.getItem(AUTH_USER);
    const user = JSON.parse(authUser!);
    const isAlreadyManagerPath = window.location.pathname.indexOf('manager') === 1

    if (!token) {
      this.router.navigate(['auth'])
    }
    if (token && user.role === Role.MANAGER && !isAlreadyManagerPath) {
      this.router.navigate(['manager'])
    }
    if (token && user.role === Role.ADVISOR) {
      this.router.navigate(['advisor'])
    }
  }

}
