import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoUp } from './two-up';

describe('TwoUp', () => {
  let component: TwoUp;
  let fixture: ComponentFixture<TwoUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoUp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
