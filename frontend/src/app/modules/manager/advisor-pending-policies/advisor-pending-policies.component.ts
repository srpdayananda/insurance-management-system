import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PolicyService } from 'src/app/core/services/policy/policy.service';
import { IPolicy } from './../../../shared/interface/policy.interface';
import { ToastrService } from 'ngx-toastr';
import { Status } from './../../../shared/enum/policy-enum';


@Component({
  selector: 'app-advisor-pending-policies',
  templateUrl: './advisor-pending-policies.component.html',
  styleUrls: ['./advisor-pending-policies.component.css']
})
export class AdvisorPendingPoliciesComponent implements OnInit {
  policies: IPolicy[];
  statuses: typeof Status

  constructor(
    private policyService: PolicyService,
    private toastr: ToastrService,
    private router: Router) {
    this.policies = []
    this.statuses = Status;
  }

  ngOnInit(): void {
    this.getPolices()
  }

  getPolices() {
    this.policyService.getPolicy(this.statuses.NOT_APPROVED).subscribe((response) => {
      if (response.success) {
        this.policies = response?.policies || []
        console.log(this.policies)
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
          this.getPolices()
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

}
