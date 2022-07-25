import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentMethodsComponent } from './dialog-payment-methods.component';

describe('DialogPaymentMethodsComponent', () => {
  let component: DialogPaymentMethodsComponent;
  let fixture: ComponentFixture<DialogPaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentMethodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
