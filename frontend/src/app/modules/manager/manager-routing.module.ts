import { AdvisorPoliciesComponent } from './advisor-policies/advisor-policies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { AdvisorPendingPoliciesComponent } from './advisor-pending-policies/advisor-pending-policies.component';


const routes: Routes = [
  { path: '', component: ManagerComponent },
  { path: 'policies/:id', component: AdvisorPoliciesComponent },
  { path: 'pending/:policy', component: AdvisorPendingPoliciesComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }
