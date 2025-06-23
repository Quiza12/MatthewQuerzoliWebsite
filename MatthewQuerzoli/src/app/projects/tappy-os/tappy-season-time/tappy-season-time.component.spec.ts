import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TappySeasonTimeComponent } from './tappy-season-time.component';

describe('TappySeasonTimeComponent', () => {
  let component: TappySeasonTimeComponent;
  let fixture: ComponentFixture<TappySeasonTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TappySeasonTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TappySeasonTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
