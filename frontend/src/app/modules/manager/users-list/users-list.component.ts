import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { IUser } from './../../../shared/interface/user.interface';
import { UserAddEditComponent } from './../user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  @Input() users: IUser[];
  @ViewChild('goToEdit') goToEdit: UserAddEditComponent

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openEditComponent() {
    this.goToEdit.openModal()
  }

}
