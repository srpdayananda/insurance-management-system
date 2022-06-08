import { Component, OnInit, ViewChild } from '@angular/core';

import { PoliciesAddEditComponent } from './policies-add-edit/policies-add-edit.component';
import { PolicyService } from './../../core/services/policy/policy.service';
import { IPolicy } from './../../shared/interface/policy.interface';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './../../core/services/data/data.service';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.css'],
})
export class AdvisorComponent implements OnInit {
  @ViewChild('onAddPolicyModal') onAddPolicyModal: PoliciesAddEditComponent;
  policiesList: Array<IPolicy>;
  id: string;

  constructor(
    private policyService: PolicyService,
    private toastr: ToastrService,
    private dataService: DataService
  ) {
    this.policiesList = [];
  }

  ngOnInit(): void {
    this.getLoggedUser()
    this.getPoliciesList()
  }

  onRefetch(refetch: boolean) {
    if (refetch) {
      this.getPoliciesList();
    }
  }
  getLoggedUser() {
    this.dataService.getLoggedUser().subscribe((loggedUser) => {
      if (loggedUser) {
        this.id = loggedUser.id;
      }
    })
  }

  addPolicyModal() {
    this.onAddPolicyModal.openModal()
  }
  getPoliciesList() {
    this.policyService.getPolicy(this.id).subscribe((response) => {
      if (response.success) {
        this.policiesList = response?.policies || []
      }
    }, (err) => {
      const errors = err?.error?.errors
      if (errors.length) {
        errors.map((message: string) => this.toastr.error(message))
      }
    })
  }

}
