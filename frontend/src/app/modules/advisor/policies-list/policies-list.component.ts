import { Component, Input, OnInit } from '@angular/core';

import { IPolicy } from './../../../shared/interface/policy.interface';
import { Status } from 'src/app/shared/enum/policy-enum';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.css']
})
export class PoliciesListComponent implements OnInit {
  @Input('policies') policies: IPolicy[];
  statuses: typeof Status

  constructor() {
    this.statuses = Status
  }

  ngOnInit(): void {
  }

  resolveStatus(status: Status) {
    // const lowerCaseStatus = `${status.toLowerCase()}`;
    // const capitalized = `${lowerCaseStatus.charAt(0).toUpperCase()}${lowerCaseStatus.substring(1)}`
    // const underscore = capitalized.replace('_', ' ')
    // console.log(underscore)

    return (`${status.toLowerCase().charAt(0).toUpperCase()}${status.toLowerCase().substring(1)}`).replace('_', ' ')
  }

}
