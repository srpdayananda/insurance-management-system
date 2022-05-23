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
  roles: Array<string>
  editUserId: string | null;



  constructor(
    private modalService: BsModalService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.refetch = new EventEmitter(false);
    this.roles = Object.keys(Role)
    this.editUserId = null
  }


  ngOnInit(): void {
  }

  get f() {
    return this.form.controls
  }
  openModal(user?: IUser) {
    if (user) {
      this.editUserId = user.id
      this.form = new FormGroup({
        firstName: new FormControl(user.firstName, Validators.required),
        lastName: new FormControl(user.lastName, Validators.required),
      })
    }
    else {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        role: new FormControl(this.roles[1], Validators.required)
      })
    }
    this.modalRef = this.modalService.show(this.template, {
      class: 'bs-modal-top-20',
      animated: true,
      ignoreBackdropClick: true
    });
  }

  closeModal() {
    this.modalService.hide()
    setTimeout(() => {
      this.form.reset()
      this.editUserId = null
    }, 500)
    this.refetch.emit(false)
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    if (this.editUserId) {
      this.updateUser();
      return;
    }
    this.createUser();
  }


  updateUser() {
    const props = {
      id: this.editUserId,
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value
    }
    this.userService.updateUser(props).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
        this.modalService.hide()
        setTimeout(() => {
          this.form.reset();
          this.editUserId = null
        }, 500);
        this.refetch.emit(true)
      }
    }, (err) => {
      const errors = err?.error?.errors;
        if (errors.length) {
          errors.map((message: string) => this.toastr.error(message))
        }
    })
  }

  createUser() {
    this.userService.createUser(this.form.value).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
        this.modalService.hide()
        setTimeout(() => {
          this.form.reset();
        }, 500);
        this.refetch.emit(true)
      }
    }, (err) => {
      const errors = err?.error?.errors;
        if (errors.length) {
          errors.map((message: string) => this.toastr.error(message))
        }
    })
  }
}



