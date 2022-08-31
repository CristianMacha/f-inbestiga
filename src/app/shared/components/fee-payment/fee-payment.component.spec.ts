import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePaymentComponent } from './fee-payment.component';

describe('FeePaymentComponent', () => {
  let component: FeePaymentComponent;
  let fixture: ComponentFixture<FeePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
