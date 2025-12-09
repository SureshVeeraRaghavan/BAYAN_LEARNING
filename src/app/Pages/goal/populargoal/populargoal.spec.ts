import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Populargoal } from './populargoal';

describe('Populargoal', () => {
  let component: Populargoal;
  let fixture: ComponentFixture<Populargoal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Populargoal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Populargoal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
