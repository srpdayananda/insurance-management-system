import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AdvisorRoutingModule } from './advisor-routing.module';
import { AdvisorComponent } from './advisor.component';
import { ComponentsModule } from './../../shared/components/components.module';
import { PoliciesAddEditComponent } from './policies-add-edit/policies-add-edit.component';
import { PoliciesListComponent } from './policies-list/policies-list.component';

@NgModule({
  declarations: [AdvisorComponent, PoliciesAddEditComponent, PoliciesListComponent],
  imports: [CommonModule, AdvisorRoutingModule, ComponentsModule, ModalModule.forRoot(), ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvisorModule { }
