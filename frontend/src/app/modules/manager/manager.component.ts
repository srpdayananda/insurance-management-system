import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { UserService } from './../../core/services/user/user.service';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { IUser } from './../../shared/interface/user.interface';
import { ConformationPopupComponent } from './../../shared/components/conformation-popup/conformation-popup.component';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  userList: Array<IUser>
  @ViewChild('addEditUserModal') addEditUserModal: UserAddEditComponent;
  @ViewChild('deleteUserModal') deleteUserModal: ConformationPopupComponent
  searchUserList: Array<IUser>
  deletedUserId: string | null;


  constructor(private userService: UserService, private toastr: ToastrService) {
    this.userList = []
    this.deletedUserId = null
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
        this.searchUserList = this.userList
      }
    })
  }

  onKeyUp(event: any) {
    const searchKey = event.target.value;
    if (searchKey && searchKey !== '') {
      this.searchUserList = this.userList.filter((user) => {
        const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`
        if (fullName.includes(searchKey.toLowerCase())) {
          return true;
        }
        return false;
      })
    } else {
      this.searchUserList = this.userList;
    }
  }

  userAddEditModal(): void {
    this.addEditUserModal.openModal()
  }

  onEditUser(user: IUser) {
    this.addEditUserModal.openModal(user)
  }
  

  onConform(isConform: boolean) {
    if (isConform && this.deletedUserId) {
      this.userService.deleteUser(this.deletedUserId).subscribe((response) => {
        if (response.success) {
          this.toastr.success(response.message);
          this.deletedUserId = null
          this.getUsers()
        }
      }, (err) => {
        const errors = err?.error?.errors;
        if (errors.length) {
          errors.map((message: string) => this.toastr.error(message))
        }
      })

    }
  }

  onDeleteUser(userId: string) {
    if (userId) {
      this.deletedUserId = userId;

      const message: string = 'Are you sure you want to delete this user ..?'

      this.deleteUserModal.openModal(message)
    }

  }
}
