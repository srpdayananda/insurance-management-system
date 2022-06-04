import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesAddEditComponent } from './policies-add-edit.component';

describe('PoliciesAddEditComponent', () => {
  let component: PoliciesAddEditComponent;
  let fixture: ComponentFixture<PoliciesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliciesAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliciesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
