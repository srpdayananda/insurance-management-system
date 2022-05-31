import { Component, OnInit, ViewChild } from '@angular/core';

import { PoliciesAddEditComponent } from './policies-add-edit/policies-add-edit.component';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.css'],
})
export class AdvisorComponent implements OnInit {
  @ViewChild('onAddPolicyModal') onAddPolicyModal: PoliciesAddEditComponent;

  constructor() { }

  ngOnInit(): void {

  }

  addPolicyModal() {
    this.onAddPolicyModal.openModal()
  }

}
