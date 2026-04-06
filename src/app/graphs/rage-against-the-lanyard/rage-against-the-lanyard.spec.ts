import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RageAgainstTheLanyard } from './rage-against-the-lanyard';

describe('RageAgainstTheLanyard', () => {
  let component: RageAgainstTheLanyard;
  let fixture: ComponentFixture<RageAgainstTheLanyard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RageAgainstTheLanyard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RageAgainstTheLanyard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
