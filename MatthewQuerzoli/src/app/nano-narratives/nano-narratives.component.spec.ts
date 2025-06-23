import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NanoNarrativesComponent } from './nano-narratives.component';

describe('NanoNarrativesComponent', () => {
  let component: NanoNarrativesComponent;
  let fixture: ComponentFixture<NanoNarrativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NanoNarrativesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NanoNarrativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
