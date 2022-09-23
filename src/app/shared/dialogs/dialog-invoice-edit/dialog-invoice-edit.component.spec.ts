import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInvoiceEditComponent } from './dialog-invoice-edit.component';

describe('DialogInvoiceEditComponent', () => {
  let component: DialogInvoiceEditComponent;
  let fixture: ComponentFixture<DialogInvoiceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInvoiceEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInvoiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
