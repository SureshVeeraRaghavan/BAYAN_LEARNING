import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyGoal } from './weekly-goal';

describe('WeeklyGoal', () => {
  let component: WeeklyGoal;
  let fixture: ComponentFixture<WeeklyGoal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyGoal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyGoal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
