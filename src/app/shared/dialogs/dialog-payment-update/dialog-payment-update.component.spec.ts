import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentUpdateComponent } from './dialog-payment-update.component';

describe('DialogPaymentUpdateComponent', () => {
  let component: DialogPaymentUpdateComponent;
  let fixture: ComponentFixture<DialogPaymentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPaymentUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPaymentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
