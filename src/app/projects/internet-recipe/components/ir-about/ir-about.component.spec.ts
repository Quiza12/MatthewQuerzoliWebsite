import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrAboutComponent } from './ir-about.component';

describe('IrAboutComponent', () => {
  let component: IrAboutComponent;
  let fixture: ComponentFixture<IrAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IrAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
