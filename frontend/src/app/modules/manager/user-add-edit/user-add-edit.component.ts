import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UserService } from './../../../core/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from './../../../shared/enum/enum';
import { IUser } from './../../../shared/interface/user.interface';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>
  modalRef?: BsModalRef;
  form: FormGroup;
  @Output('refetch') refetch: EventEmitter<boolean>
  editMode: boolean;

  roles: Array<string>
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  userPassword: string;


  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.refetch = new EventEmitter(false);
    this.roles = Object.keys(Role)
    this.userEmail = '';
    this.userFirstName = '';
    this.userLastName = '';
    this.userPassword = '';
    this.editMode = false;
  }


  ngOnInit(): void {
  }

  get f() {
    return this.form.controls
  }
  openModal(user: IUser) {
    if (user) {
      this.editMode = true;
      this.userEmail = user.email
      this.userFirstName = user.firstName
      this.userLastName = user.lastName
      this.userPassword = user.password
      this.roles[0] = user.role
    }
    this.editMode = false;

    this.modalRef = this.modalService.show(this.template);

    this.form = new FormGroup({
      email: new FormControl(this.userEmail, [Validators.required, Validators.email]),
      firstName: new FormControl(this.userFirstName, Validators.required),
      lastName: new FormControl(this.userLastName, Validators.required),
      password: new FormControl(this.userPassword, [Validators.required, Validators.minLength(8)]),
      role: new FormControl(this.roles[1], Validators.required)
    })
  }

  closeModal() {
    this.modalService.hide()
    this.form.reset()
    this.refetch.emit(false)
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    if (this.editMode) {

      this.userService.updateUser(this.form.value).subscribe((response) => {
        console.log('@@@', response)
      }, (err) => {
        console.log('###', err)
      })
    }
    this.userService.create(this.form.value).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
        this.form.reset();
        this.modalService.hide()
        this.refetch.emit(true)
      }
    }, (err) => {
      this.toastr.error(err?.error?.errors)
    })
  }

}
