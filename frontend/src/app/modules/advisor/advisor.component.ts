import { Component, OnInit, ViewChild } from '@angular/core';

import { PoliciesAddEditComponent } from './policies-add-edit/policies-add-edit.component';
import { PolicyService } from './../../core/services/policy/policy.service';
import { IPolicy } from './../../shared/interface/policy.interface';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.css'],
})
export class AdvisorComponent implements OnInit {
  @ViewChild('onAddPolicyModal') onAddPolicyModal: PoliciesAddEditComponent;
  policiesList: Array<IPolicy>;

  constructor(private policyService: PolicyService) {
    this.policiesList = []
  }

  ngOnInit(): void {
    this.getPoliciesList()
  }


  addPolicyModal() {
    this.onAddPolicyModal.openModal()
  }
  getPoliciesList() {
    this.policyService.getPolicy().subscribe((response) => {
      if (response.success) {
        this.policiesList = response?.policies || []
        console.log(this.policiesList)
      }
    }, (err) => {
      console.log(err)
    })
  }

}
