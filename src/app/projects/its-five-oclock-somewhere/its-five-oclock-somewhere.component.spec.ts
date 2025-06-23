import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsFiveOclockSomewhereComponent } from './its-five-oclock-somewhere.component';

describe('ItsFiveOclockSomewhereComponent', () => {
  let component: ItsFiveOclockSomewhereComponent;
  let fixture: ComponentFixture<ItsFiveOclockSomewhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItsFiveOclockSomewhereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItsFiveOclockSomewhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
