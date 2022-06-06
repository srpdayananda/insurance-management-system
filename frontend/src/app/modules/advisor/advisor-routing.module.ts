import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdvisorComponent } from './advisor.component';
import { PoliciesListComponent } from './policies-list/policies-list.component';

const routes: Routes = [
  { path: '', component: AdvisorComponent },
  { path: ':id', component: PoliciesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvisorRoutingModule { }
