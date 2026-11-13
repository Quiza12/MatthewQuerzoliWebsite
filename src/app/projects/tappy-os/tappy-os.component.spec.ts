import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TappyOsComponent } from './tappy-os.component';
import { projects, tappyOsProjectPattern } from '../projects';
import { pageChromeTests } from '../../testing/page-chrome';

describe('TappyOsComponent', () => {
  let component: TappyOsComponent;
  let fixture: ComponentFixture<TappyOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TappyOsComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function create(): ComponentFixture<TappyOsComponent> {
    fixture = TestBed.createComponent(TappyOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  const cards = () => Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('.project-card'));

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => create(),
    title: 'Tappy OS - Projects',
    favicon: 'assets/images/favicons/tappy-os-favicon.png',
  });

  it('shows a card for every active internal Tappy OS sub-project', () => {
    create();
    const expected = projects.filter(p =>
      p.internal && p.active && !p.underConstruction && tappyOsProjectPattern.test(p.route));

    expect(expected.length).toBeGreaterThan(0);
    expect(cards().length).toBe(expected.length);
    expect(cards().map(c => c.getAttribute('href')).sort()).toEqual(expected.map(p => p.route).sort());
  });

  it('does not show the Tappy OS landing page itself or non-Tappy projects', () => {
    create();
    const hrefs = cards().map(c => c.getAttribute('href'));
    expect(hrefs).not.toContain('/projects/tappy-os');
    expect(hrefs.every(h => h!.startsWith('/projects/tappy-os/'))).toBe(true);
  });
});
