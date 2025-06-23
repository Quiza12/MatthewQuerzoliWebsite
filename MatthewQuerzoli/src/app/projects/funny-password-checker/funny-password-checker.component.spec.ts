import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnyPasswordCheckerComponent } from './funny-password-checker.component';

describe('FunnyPasswordCheckerComponent', () => {
  let component: FunnyPasswordCheckerComponent;
  let fixture: ComponentFixture<FunnyPasswordCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunnyPasswordCheckerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunnyPasswordCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
