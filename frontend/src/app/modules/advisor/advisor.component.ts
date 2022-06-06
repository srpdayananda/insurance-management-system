import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PoliciesAddEditComponent } from './policies-add-edit/policies-add-edit.component';
import { PolicyService } from './../../core/services/policy/policy.service';
import { IPolicy } from './../../shared/interface/policy.interface';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-advisor',
  templateUrl: './advisor.component.html',
  styleUrls: ['./advisor.component.css'],
})
export class AdvisorComponent implements OnInit, OnDestroy {
  @ViewChild('onAddPolicyModal') onAddPolicyModal: PoliciesAddEditComponent;
  policiesList: Array<IPolicy>;
  userId: string;
  subscription: Subscription;

  constructor(
    private policyService: PolicyService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.policiesList = []
  }

  ngOnInit(): void {
    this.getPoliciesList()
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.userId = params['id']
    })
  }

  onRefetch(refetch: boolean) {
    if (refetch) {
      this.getPoliciesList()
    }
  }


  addPolicyModal() {
    this.onAddPolicyModal.openModal()
  }
  getPoliciesList() {
    this.policyService.getPolicy().subscribe((response) => {
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


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
