import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConformationPopupComponent } from './conformation-popup.component';

describe('ConformationPopupComponent', () => {
  let component: ConformationPopupComponent;
  let fixture: ComponentFixture<ConformationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConformationPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConformationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
