import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aigoalinsights } from './aigoalinsights';

describe('Aigoalinsights', () => {
  let component: Aigoalinsights;
  let fixture: ComponentFixture<Aigoalinsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aigoalinsights]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aigoalinsights);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
