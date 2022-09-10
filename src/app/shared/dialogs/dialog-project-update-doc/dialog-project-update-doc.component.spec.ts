import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProjectUpdateDocComponent } from './dialog-project-update-doc.component';

describe('DialogProjectUpdateDocComponent', () => {
  let component: DialogProjectUpdateDocComponent;
  let fixture: ComponentFixture<DialogProjectUpdateDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProjectUpdateDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogProjectUpdateDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
