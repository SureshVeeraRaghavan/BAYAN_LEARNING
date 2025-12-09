import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningProgress } from './learning-progress';

describe('LearningProgress', () => {
  let component: LearningProgress;
  let fixture: ComponentFixture<LearningProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningProgress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearningProgress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
