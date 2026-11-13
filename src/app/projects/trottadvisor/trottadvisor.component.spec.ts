import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrottadvisorComponent } from './trottadvisor.component';
import { pageChromeTests } from '../../testing/page-chrome';

describe('TrottadvisorComponent', () => {
  let component: TrottadvisorComponent;
  let fixture: ComponentFixture<TrottadvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrottadvisorComponent],
    }).compileComponents();
  });

  function create(): ComponentFixture<TrottadvisorComponent> {
    fixture = TestBed.createComponent(TrottadvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => create(),
    title: 'Trottadvisor - Projects',
    favicon: 'assets/images/favicons/trottadvisor-favicon.png',
  });

  it('renders its page content', () => {
    create();
    expect((fixture.nativeElement as HTMLElement).textContent!.trim().length).toBeGreaterThan(0);
  });
});
