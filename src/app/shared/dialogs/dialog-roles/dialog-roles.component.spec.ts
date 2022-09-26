import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRolesComponent } from './dialog-roles.component';

describe('DialogRolesComponent', () => {
  let component: DialogRolesComponent;
  let fixture: ComponentFixture<DialogRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
