import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVerifyPaymentComponent } from './dialog-verify-payment.component';

describe('DialogVerifyPaymentComponent', () => {
  let component: DialogVerifyPaymentComponent;
  let fixture: ComponentFixture<DialogVerifyPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVerifyPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogVerifyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
