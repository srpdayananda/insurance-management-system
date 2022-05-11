import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from './../../core/services/user/user.service';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  userList: Array<any>
  @ViewChild('addEditUserModal') addEditUserModal: UserAddEditComponent;

  constructor(private userService: UserService) {
    this.userList = []
  }

  ngOnInit(): void {
    this.getUsers()
  }
  onRefetch(refetch: boolean) {
    this.getUsers()
  }

  getUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      if (response.success) {
        this.userList = response?.users || []
      }
    })
  }
  userAddEditModal(): void {
    this.addEditUserModal.openModal()
  }
}
