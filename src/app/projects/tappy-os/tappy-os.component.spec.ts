import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TappyOsComponent } from './tappy-os.component';

describe('TappyOsComponent', () => {
  let component: TappyOsComponent;
  let fixture: ComponentFixture<TappyOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TappyOsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TappyOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
