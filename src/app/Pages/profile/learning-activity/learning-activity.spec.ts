import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningActivity } from './learning-activity';

describe('LearningActivity', () => {
  let component: LearningActivity;
  let fixture: ComponentFixture<LearningActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningActivity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningActivity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
