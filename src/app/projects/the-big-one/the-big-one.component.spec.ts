import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheBigOneComponent } from './the-big-one.component';

describe('TheBigOneComponent', () => {
  let component: TheBigOneComponent;
  let fixture: ComponentFixture<TheBigOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheBigOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheBigOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
