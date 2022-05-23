import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IUser } from './../../../shared/interface/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  @Input() users: IUser[];
  @Output() onEdit: EventEmitter<IUser>
  @Output() onDelete: EventEmitter<string>

  constructor() {
    this.onEdit = new EventEmitter<IUser>()
    this.onDelete = new EventEmitter<string>()
  }

  ngOnInit(): void {
  }

  editClickListener(user: IUser) {
    this.onEdit.emit(user)
  }

  deleteClickListener(user: IUser) {
    this.onDelete.emit(user.id)
  }

}
