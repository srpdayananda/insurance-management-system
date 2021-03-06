import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PolicyService } from './../../../core/services/policy/policy.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-policies-add-edit',
  templateUrl: './policies-add-edit.component.html',
  styleUrls: ['./policies-add-edit.component.css']
})
export class PoliciesAddEditComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>
  modalRef?: BsModalRef;
  form: FormGroup;
  @Output() refetch: EventEmitter<boolean>


  constructor(
    private modalService: BsModalService,
    private policyService: PolicyService,
    private toastr: ToastrService
  ) {
    this.refetch = new EventEmitter(false)
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
    this.onCreatePolicy()
  }

  onClosed() {
    this.modalRef?.hide();
    setTimeout(() => {
      this.form.reset()
    }, 500)
  }

  onCreatePolicy() {
    this.policyService.createPolicy(this.form.value).subscribe((response) => {
      if (response.success) {
        this.toastr.success(response.message)
        this.modalRef?.hide()
        setTimeout(() => {
          this.form.reset()
        }, 500)
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
