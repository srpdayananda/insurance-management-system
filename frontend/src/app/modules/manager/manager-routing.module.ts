import { AdvisorPoliciesComponent } from './advisor-policies/advisor-policies.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerComponent } from './manager.component';


const routes: Routes = [
  { path: '', component: ManagerComponent },
  { path: 'policies/:id', component:AdvisorPoliciesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }
