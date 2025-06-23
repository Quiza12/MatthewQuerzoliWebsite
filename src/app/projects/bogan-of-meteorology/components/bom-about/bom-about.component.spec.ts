import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomAboutComponent } from './bom-about.component';

describe('BomAboutComponent', () => {
  let component: BomAboutComponent;
  let fixture: ComponentFixture<BomAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BomAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BomAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
