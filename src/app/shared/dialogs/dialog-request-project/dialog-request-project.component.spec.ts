import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestProjectComponent } from './dialog-request-project.component';

describe('RequestProjectComponent', () => {
  let component: RequestProjectComponent;
  let fixture: ComponentFixture<RequestProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
