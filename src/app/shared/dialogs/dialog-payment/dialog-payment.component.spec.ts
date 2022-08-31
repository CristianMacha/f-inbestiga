import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentComponent } from './dialog-payment.component';

describe('DialogPaymentComponent', () => {
  let component: DialogPaymentComponent;
  let fixture: ComponentFixture<DialogPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
