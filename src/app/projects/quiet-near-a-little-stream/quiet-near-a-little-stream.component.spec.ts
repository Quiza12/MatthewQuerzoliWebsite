import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuietNearALittleStreamComponent } from './quiet-near-a-little-stream.component';

describe('QuietNearALittleStreamComponent', () => {
  let component: QuietNearALittleStreamComponent;
  let fixture: ComponentFixture<QuietNearALittleStreamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuietNearALittleStreamComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuietNearALittleStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
