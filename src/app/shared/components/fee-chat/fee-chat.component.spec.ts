import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeChatComponent } from './fee-chat.component';

describe('FeeChatComponent', () => {
  let component: FeeChatComponent;
  let fixture: ComponentFixture<FeeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
