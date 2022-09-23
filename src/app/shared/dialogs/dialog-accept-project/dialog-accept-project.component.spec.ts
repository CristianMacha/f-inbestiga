import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAcceptProjectComponent } from './dialog-accept-project.component';

describe('DialogAcceptProjectComponent', () => {
  let component: DialogAcceptProjectComponent;
  let fixture: ComponentFixture<DialogAcceptProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAcceptProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAcceptProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
