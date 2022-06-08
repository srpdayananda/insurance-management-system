import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorPendingPoliciesComponent } from './advisor-pending-policies.component';

describe('AdvisorPendingPoliciesComponent', () => {
  let component: AdvisorPendingPoliciesComponent;
  let fixture: ComponentFixture<AdvisorPendingPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvisorPendingPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorPendingPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
