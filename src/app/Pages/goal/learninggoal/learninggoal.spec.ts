import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Learninggoal } from './learninggoal';

describe('Learninggoal', () => {
  let component: Learninggoal;
  let fixture: ComponentFixture<Learninggoal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Learninggoal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Learninggoal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
