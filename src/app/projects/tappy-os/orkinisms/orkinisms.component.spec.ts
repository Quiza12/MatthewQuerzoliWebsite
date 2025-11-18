import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrkinismsComponent } from './orkinisms.component';

describe('OrkinismsComponent', () => {
  let component: OrkinismsComponent;
  let fixture: ComponentFixture<OrkinismsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrkinismsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrkinismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
