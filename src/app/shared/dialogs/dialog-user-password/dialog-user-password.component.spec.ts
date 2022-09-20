import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserPasswordComponent } from './dialog-user-password.component';

describe('DialogUserPasswordComponent', () => {
  let component: DialogUserPasswordComponent;
  let fixture: ComponentFixture<DialogUserPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
