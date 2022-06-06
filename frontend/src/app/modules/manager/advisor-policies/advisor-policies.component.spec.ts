import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorPoliciesComponent } from './advisor-policies.component';

describe('AdvisorPoliciesComponent', () => {
  let component: AdvisorPoliciesComponent;
  let fixture: ComponentFixture<AdvisorPoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvisorPoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
