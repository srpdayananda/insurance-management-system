import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UserService } from './../../../core/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>
  modalRef?: BsModalRef;
  form: FormGroup;
  @Output('refetch') refetch = new EventEmitter<boolean>()

  constructor(private modalService: BsModalService, private userService: UserService, private toastr: ToastrService) {
    this.refetch.emit(false)
  }


  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('', Validators.required)
    })
  }
  userRole = ['MANAGER', 'ADVISOR']

  get f() {
    return this.form.controls
  }

  openModal() {
    this.modalRef = this.modalService.show(this.template);
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
