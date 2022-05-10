import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvisorRoutingModule } from './advisor-routing.module';
import { AdvisorComponent } from './advisor.component';
import { ComponentsModule } from './../../shared/components/components.module';

@NgModule({
  declarations: [AdvisorComponent],
  imports: [CommonModule, AdvisorRoutingModule, ComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvisorModule { }
