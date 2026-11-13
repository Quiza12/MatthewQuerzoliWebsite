import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetRecipeAboutComponent } from './ir-about.component';

describe('InternetRecipeAboutComponent', () => {
  let component: InternetRecipeAboutComponent;
  let fixture: ComponentFixture<InternetRecipeAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternetRecipeAboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InternetRecipeAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders its content', () => {
    expect((fixture.nativeElement as HTMLElement).textContent!.trim().length).toBeGreaterThan(0);
  });
});
