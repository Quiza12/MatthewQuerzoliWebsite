import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsComponent } from './testimonials.component';
import { pageTitleTest } from '../testing/page-chrome';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsComponent],
    }).compileComponents();
  });

  function create(): ComponentFixture<TestimonialsComponent> {
    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageTitleTest({ create: () => create(), title: 'Testimonials - Matthew Querzoli' });

  it('renders its content', () => {
    create();
    expect((fixture.nativeElement as HTMLElement).textContent!.trim().length).toBeGreaterThan(0);
  });

  it('works out the age from the birth year', () => {
    create();
    expect(component.getAge()).toBe(new Date().getFullYear() - component.birthYear);
    expect(component.age).toBe(component.getAge());
  });

  it('shows the age in the testimonial', () => {
    create();
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(`Dear ${component.age}-year-old`);
  });
});
