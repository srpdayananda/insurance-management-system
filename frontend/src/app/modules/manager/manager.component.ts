import { Component,  OnInit, ViewChild } from '@angular/core';

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
  isConform: boolean;


  constructor(private userService: UserService) {
    this.userList = []
    this.isConform = false;
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
    if (isConform) {
      this.isConform = isConform;
      console.log('@@@', this.isConform)
      
    }
  }

  onDeleteUser(userId: string) {
    if (userId) {

      const message: string = 'Are you sure you want to delete this user ..?'


      this.userService.deleteUser(userId).subscribe((response) => {
        console.log(response)
        this.isConform
      }, (err) => {
        console.log(err)
      })

      this.deleteUserModal.openModal(message)
    }

  }
}
