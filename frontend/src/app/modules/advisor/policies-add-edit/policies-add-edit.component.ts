import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-policies-add-edit',
  templateUrl: './policies-add-edit.component.html',
  styleUrls: ['./policies-add-edit.component.css']
})
export class PoliciesAddEditComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>
  modalRef?: BsModalRef;
  form: FormGroup;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls
  }

  openModal() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    })

    this.modalRef = this.modalService.show(this.template, {
      class: 'bs-modal-top-20',
      animated: true,
      ignoreBackdropClick: true
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
  }

  onClosed() {
    this.modalRef?.hide();
    setTimeout(() => {
      this.form.reset()
    }, 500)
  }

}
