import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagerRoutingModule } from './manager-routing.module';

import { ManagerComponent } from './manager.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ComponentsModule } from './../../shared/components/components.module';

@NgModule({
  declarations: [ManagerComponent, UsersListComponent, UserEditComponent],
  imports: [CommonModule, ManagerRoutingModule, ReactiveFormsModule, ComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManagerModule { }
