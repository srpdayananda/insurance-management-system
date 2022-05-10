import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../core/services/user/user.service';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.css'],
})
export class AdvisorComponent implements OnInit {
  user: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.create();
  }

  create() {
    this.userService.create(this.user).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  test(): void {
    this.router.navigate(['manager']);
  }
}
