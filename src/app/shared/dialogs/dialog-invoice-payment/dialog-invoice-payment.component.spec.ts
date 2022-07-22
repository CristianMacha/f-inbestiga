import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInvoicePaymentComponent } from './dialog-invoice-payment.component';

describe('DialogInvoicePaymentComponent', () => {
  let component: DialogInvoicePaymentComponent;
  let fixture: ComponentFixture<DialogInvoicePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInvoicePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInvoicePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
