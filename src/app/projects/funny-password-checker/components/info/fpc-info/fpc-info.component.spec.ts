import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpcInfoComponent } from './fpc-info.component';

describe('FpcInfoComponent', () => {
  let component: FpcInfoComponent;
  let fixture: ComponentFixture<FpcInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FpcInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FpcInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
