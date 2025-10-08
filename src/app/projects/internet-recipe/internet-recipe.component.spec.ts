import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetRecipeComponent } from './internet-recipe.component';

describe('InternetRecipeComponent', () => {
  let component: InternetRecipeComponent;
  let fixture: ComponentFixture<InternetRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternetRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
