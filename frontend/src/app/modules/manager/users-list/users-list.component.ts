import { Component, Input, OnInit } from '@angular/core';

import { IUser } from './../../../shared/interface/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  @Input() users: IUser[];

  constructor() { }

  ngOnInit(): void {
  }

}
