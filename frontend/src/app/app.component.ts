import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AUTH_TOKEN } from './constructor/app.constructor';
import { AUTH_USER } from './constructor/app.constructor';
import { Role } from 'src/app/shared/enum/enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem(AUTH_TOKEN);
    const authUser = localStorage.getItem(AUTH_USER);
    const user = JSON.parse(authUser!);

    switch (true) {
      case token && user.role === Role.MANAGER:
        this.router.navigate(['manager']);
        break;
      case token && user.role === Role.ADVISOR:
        break;
      default:
        this.router.navigate(['auth']);
    }
  }
}
