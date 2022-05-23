import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-conformation-popup',
  templateUrl: './conformation-popup.component.html',
  styleUrls: ['./conformation-popup.component.css']
})
export class ConformationPopupComponent implements OnInit {
  @ViewChild('template') template: TemplateRef<any>
  modalRef?: BsModalRef;
  message: string;
  @Output() isConform: EventEmitter<boolean>


  constructor(private modalService: BsModalService,) {
    this.isConform = new EventEmitter(false)
  }

  ngOnInit(): void {
  }

  openModal(message: string) {
    this.message = message

    this.modalRef = this.modalService.show(this.template, {
      class: 'bs-modal-top-20',
      animated: true,
      ignoreBackdropClick: true
    });
  }

  yes(): void {
    this.isConform.emit(true)
    this.modalService.hide()
  }

  no(): void {
    this.isConform.emit(false)
    this.modalService.hide()
  }

}
