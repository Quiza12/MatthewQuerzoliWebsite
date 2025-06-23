import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpcAboutComponent } from './fpc-about.component';

describe('FpcAboutComponent', () => {
  let component: FpcAboutComponent;
  let fixture: ComponentFixture<FpcAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FpcAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FpcAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
