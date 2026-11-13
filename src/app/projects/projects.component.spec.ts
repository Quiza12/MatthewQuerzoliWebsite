import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { ProjectsComponent } from './projects.component';
import { projects, tappyOsProjectPattern } from './projects';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  const flatten = (groups: { projects: unknown[] }[]) => groups.flatMap(g => g.projects);
  const cards = (selector: string) => Array.from(el.querySelectorAll<HTMLAnchorElement>(selector));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets the page title', () => {
    expect(TestBed.inject(Title).getTitle()).toBe('Projects - Matthew Querzoli');
  });

  describe('grouping', () => {
    it('puts every project in exactly one section', () => {
      const placed = [
        ...flatten(component.underConstructionGroups),
        ...flatten(component.internalGroups),
        ...flatten(component.externalGroups),
        ...flatten(component.inactiveGroups),
        // Tappy OS sub-projects live on the Tappy OS page, not here.
        ...projects.filter(p => p.internal && p.active && !p.underConstruction && tappyOsProjectPattern.test(p.route)),
      ];

      expect(placed.length).toBe(projects.length);
      expect(new Set(placed).size).toBe(projects.length);
    });

    it('keeps Tappy OS sub-projects out of the internal section', () => {
      const routes = flatten(component.internalGroups).map(p => (p as { route: string }).route);
      expect(routes.some(r => tappyOsProjectPattern.test(r))).toBe(false);
      expect(routes).toContain('/projects/tappy-os');
    });

    it('splits internal and external projects', () => {
      expect(flatten(component.internalGroups).every(p => (p as { internal: boolean }).internal)).toBe(true);
      expect(flatten(component.externalGroups).every(p => !(p as { internal: boolean }).internal)).toBe(true);
    });

    it('only puts inactive projects in the inactive section', () => {
      expect(flatten(component.inactiveGroups).every(p => !(p as { active: boolean }).active)).toBe(true);
      expect(flatten(component.internalGroups).every(p => (p as { active: boolean }).active)).toBe(true);
    });

    it('creates one group per year, newest year first', () => {
      for (const groups of [component.internalGroups, component.externalGroups, component.inactiveGroups]) {
        const years = groups.map(g => g.year);
        expect(new Set(years).size).toBe(years.length);
        expect(years).toEqual([...years].sort((a, b) => b - a));
        groups.forEach(g => expect(g.projects.every(p => p.year === g.year)).toBe(true));
      }
    });

    it('lists projects alphabetically within a year', () => {
      for (const group of component.internalGroups) {
        const names = group.projects.map(p => p.name);
        expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
      }
    });
  });

  describe('rendering', () => {
    it('renders a card for each project in each section', () => {
      expect(cards('.internal-project-card').length).toBe(flatten(component.internalGroups).length);
      expect(cards('.external-project-card').length).toBe(flatten(component.externalGroups).length);
      expect(cards('.inactive-project-card').length).toBe(flatten(component.inactiveGroups).length);
    });

    it('renders a year heading for every group', () => {
      const groupCount = component.underConstructionGroups.length + component.internalGroups.length
        + component.externalGroups.length + component.inactiveGroups.length;
      expect(el.querySelectorAll('.year-sub-row').length).toBe(groupCount);
    });

    it('links internal projects through the router', () => {
      const hrefs = cards('.internal-project-card').map(c => c.getAttribute('href'));
      expect(hrefs).toContain('/projects/two-up');
    });

    it('opens external projects in a new tab', () => {
      const external = cards('.external-project-card');
      expect(external.length).toBeGreaterThan(0);
      external.forEach(c => {
        expect(c.getAttribute('target')).toBe('_blank');
        expect(c.getAttribute('href')).toMatch(/^https?:\/\//);
      });
    });

    it('shows the under-construction section only when something is under construction', () => {
      const heading = Array.from(el.querySelectorAll('h5')).find(h => h.textContent!.includes('Under Construction'));
      expect(!!heading).toBe(component.anyUnderConstruction);
    });

    it('shows technology icons for a project', () => {
      const chromeCard = cards('.internal-project-card').find(c => c.textContent!.includes('Chrome Browser'))!;
      const alts = Array.from(chromeCard.querySelectorAll('img.tag-icon')).map(i => i.getAttribute('alt'));
      expect(alts).toEqual(['Angular', 'HTML', 'CSS']);
    });

    it('shows the project emoji and name together', () => {
      const first = flatten(component.internalGroups)[0] as { emoji: string; name: string };
      const text = cards('.internal-project-card')[0].querySelector('h4')!.textContent;
      expect(text).toContain(`${first.emoji} ${first.name}`);
    });
  });
});
