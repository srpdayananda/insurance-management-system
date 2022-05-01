import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UserService } from './../../../core/services/user/user.service';
import { IUser } from './../../../shared/interface/user.interface';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: IUser[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers().subscribe((response) => {
      if (response.users) {
        this.users = response.users
      }
    })
  }

}
