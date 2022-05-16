import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ManagerRoutingModule } from './manager-routing.module';
import { FormsModule } from '@angular/forms'

import { ManagerComponent } from './manager.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ComponentsModule } from './../../shared/components/components.module';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';

@NgModule({
  declarations: [ManagerComponent, UsersListComponent, UserAddEditComponent,],
  imports: [CommonModule, ManagerRoutingModule, ReactiveFormsModule, ComponentsModule, ModalModule.forRoot(), FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ManagerModule { }
