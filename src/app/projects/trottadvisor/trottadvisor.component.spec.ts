import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrottadvisorComponent } from './trottadvisor.component';

describe('TrottadvisorComponent', () => {
  let component: TrottadvisorComponent;
  let fixture: ComponentFixture<TrottadvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrottadvisorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrottadvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
