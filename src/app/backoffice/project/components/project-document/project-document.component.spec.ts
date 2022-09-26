import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDocumentComponent } from './project-document.component';

describe('ProjectDocumentComponent', () => {
  let component: ProjectDocumentComponent;
  let fixture: ComponentFixture<ProjectDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
