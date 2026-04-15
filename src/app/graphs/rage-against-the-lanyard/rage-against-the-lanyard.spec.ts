import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RageAgainstTheLanyardGraph } from './rage-against-the-lanyard';

describe('RageAgainstTheLanyard', () => {
  let component: RageAgainstTheLanyardGraph;
  let fixture: ComponentFixture<RageAgainstTheLanyardGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RageAgainstTheLanyardGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RageAgainstTheLanyardGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
