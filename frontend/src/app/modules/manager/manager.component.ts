import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from './../../core/services/user/user.service';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { IUser } from './../../shared/interface/user.interface';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  userList: Array<any>
  @ViewChild('addEditUserModal') addEditUserModal: UserAddEditComponent;
  searchText: any;

  constructor(private userService: UserService) {
    this.userList = []
  }

  ngOnInit(): void {
    this.getUsers()
  }
  onRefetch(refetch: boolean) {
    if (refetch) {
      this.getUsers()
    }

  }

  getUsers(): void {
    this.userService.getUsers().subscribe((response) => {
      if (response.success) {
        this.userList = response?.users || []
      }
    })
  }
  userAddEditModal(): void {
    // this.addEditUserModal.openModal()
  }
  onEditUser(user: IUser) {
    this.addEditUserModal.openModal(user)

  }
}
