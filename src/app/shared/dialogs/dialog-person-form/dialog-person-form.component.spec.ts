import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPersonFormComponent } from './dialog-person-form.component';

describe('DialogPersonFormComponent', () => {
  let component: DialogPersonFormComponent;
  let fixture: ComponentFixture<DialogPersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPersonFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
