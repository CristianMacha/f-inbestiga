import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProjectEditTotalComponent } from './dialog-project-edit-total.component';

describe('DialogProjectEditTotalComponent', () => {
  let component: DialogProjectEditTotalComponent;
  let fixture: ComponentFixture<DialogProjectEditTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProjectEditTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProjectEditTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
