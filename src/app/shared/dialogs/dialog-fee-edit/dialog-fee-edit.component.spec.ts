import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFeeEditComponent } from './dialog-fee-edit.component';

describe('DialogFeeEditComponent', () => {
  let component: DialogFeeEditComponent;
  let fixture: ComponentFixture<DialogFeeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFeeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFeeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
