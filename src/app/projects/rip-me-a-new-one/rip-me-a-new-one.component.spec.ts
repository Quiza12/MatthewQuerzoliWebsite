import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RipMeANewOneComponent } from './rip-me-a-new-one.component';

describe('RipMeANewOneComponent', () => {
  let component: RipMeANewOneComponent;
  let fixture: ComponentFixture<RipMeANewOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RipMeANewOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RipMeANewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
