import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    private toastr: ToastrService,
    private router: Router
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

  onApproved(id: string) {
    if (id) {
      const updateStatus = {
        id: id,
        status: this.statuses.APPROVED
      }
      this.policyService.updatePolicy(updateStatus).subscribe((response) => {
        if (response.success) {
          this.getAdvisorPolicies()
        }
      }, (err) => {
        const errors = err?.error?.errors
        if (errors.length) {
          errors.map((message: string) => this.toastr.error(message))
        }
      })
    }
  }

  onClose() {
    this.router.navigate(['../../manager'])
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
