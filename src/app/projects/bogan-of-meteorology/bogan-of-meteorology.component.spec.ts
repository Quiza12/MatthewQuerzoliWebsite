import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoganOfMeteorologyComponent } from './bogan-of-meteorology.component';

describe('BoganOfMeteorologyComponent', () => {
  let component: BoganOfMeteorologyComponent;
  let fixture: ComponentFixture<BoganOfMeteorologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoganOfMeteorologyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoganOfMeteorologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
