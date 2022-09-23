import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPayFeeComponent } from './dialog-pay-fee.component';

describe('DialogPayFeeComponent', () => {
  let component: DialogPayFeeComponent;
  let fixture: ComponentFixture<DialogPayFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPayFeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPayFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
