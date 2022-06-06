import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { PolicyService } from './../../../core/services/policy/policy.service';
import { IPolicy } from './../../../shared/interface/policy.interface';
import { Status } from 'src/app/shared/enum/policy-enum';

@Component({
  selector: 'app-advisor-policies',
  templateUrl: './advisor-policies.component.html',
  styleUrls: ['./advisor-policies.component.css']
})
export class AdvisorPoliciesComponent implements OnInit, OnDestroy {
  userId: string;
  subscription: Subscription;
  policies: IPolicy[];
  statuses: typeof Status;

  constructor(
    private route: ActivatedRoute,
    private policyService: PolicyService,
    private toastr: ToastrService
  ) {
    this.policies = [];
    this.statuses = Status;
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    })
    this.getAdvisorPolicies();
  }

  getAdvisorPolicies() {
    this.policyService.getPolicy(this.userId).subscribe((response) => {
      if (response.success) {
        this.policies = response.policies || [];
      }
    }, (err) => {
      const errors = err?.error?.errors
      if (errors.length) {
        errors.map((message: string) => this.toastr.error(message))
      }
    })
  }

  resolveStatus(status: Status) {
    return (`${status.toLowerCase().charAt(0).toUpperCase()}${status.toLowerCase().substring(1)}`).replace('_', ' ')
  }

  onApproved(status: Status) {
    if (status) {
      status = this.statuses.APPROVED;
      console.log(status)
      this.policyService.getPolicy(status).subscribe((response) => {
        console.log(response)
      }, (err) => {
        console.log(err)
      })
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
