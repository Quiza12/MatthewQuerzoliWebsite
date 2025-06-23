import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TappyStandardTimeComponent } from './tappy-standard-time.component';


describe('TappyStandardTimeComponent', () => {
  let component: TappyStandardTimeComponent;
  let fixture: ComponentFixture<TappyStandardTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TappyStandardTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TappyStandardTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
