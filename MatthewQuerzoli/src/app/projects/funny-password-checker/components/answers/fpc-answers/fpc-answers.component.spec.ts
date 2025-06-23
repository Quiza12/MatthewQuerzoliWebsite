import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpcAnswersComponent } from './fpc-answers.component';

describe('FpcAnswersComponent', () => {
  let component: FpcAnswersComponent;
  let fixture: ComponentFixture<FpcAnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FpcAnswersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FpcAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
