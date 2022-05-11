import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UserService } from './../../../core/services/user/user.service';
import { IUser } from './../../../shared/interface/user.interface';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>
  modalRef?: BsModalRef;
  addUser: IUser;

  constructor(private modalService: BsModalService, private userService: UserService) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template);
  }
  onClear() {
    this.form.reset()
  }

  closeModal() {
    this.modalService.hide()
    this.onClear()
  }

  submit() {
    this.userService.create(this.form.value).subscribe((result) => {
      this.addUser = this.form.value
      console.log('result', result)
      alert('User Created Successfully')
    })
    this.onClear()
  }

}
