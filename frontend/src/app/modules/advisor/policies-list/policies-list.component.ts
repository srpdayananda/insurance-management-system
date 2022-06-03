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
  logUserId: any
  constructor() {
    
  }

  ngOnInit(): void {
  }

  onApproved(status: Status) {
    console.log(status)
  }
  

}
