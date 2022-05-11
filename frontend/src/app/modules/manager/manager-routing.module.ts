import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerComponent } from './manager.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';


const routes: Routes = [
  { path: '', component: ManagerComponent },
  { path: ':id', component: UserAddEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }
