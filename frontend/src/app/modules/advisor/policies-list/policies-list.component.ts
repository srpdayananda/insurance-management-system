import { Component, Input, OnInit } from '@angular/core';

import { IPolicy } from './../../../shared/interface/policy.interface';

@Component({
  selector: 'app-policies-list',
  templateUrl: './policies-list.component.html',
  styleUrls: ['./policies-list.component.css']
})
export class PoliciesListComponent implements OnInit {
  @Input('policies') policies: IPolicy[];
  constructor() { }

  ngOnInit(): void {
  }

}
