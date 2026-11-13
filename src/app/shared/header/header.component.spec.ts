import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { HeaderComponent } from './header.component';

@Component({ template: '' })
class Page {}

type Flag = keyof HeaderComponent;

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([{ path: '**', component: Page }])],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete (globalThis as { bootstrap?: unknown }).bootstrap;
    document.getElementById('testNav')?.remove();
  });

  // Every flag that says which navbar to show.
  const routeFlags: Flag[] = [
    'standardRoute', 'graphsRoute', 'theBigOneRoute', 'tappyOsRoute', 'tappyStandardTimeRoute', 'tappySeasonTimeRoute',
    'boganOfMeteorologyRoute', 'ripMeANewOneRoute', 'itsFiveOclockSomewhereRoute', 'funnyPasswordCheckerRoute',
    'quietNearALittleStreamRoute', 'internetRecipeRoute', 'orkisimsRoute', 'trottadvisorRoute', 'bingoRoute',
    'familyItInvoiceGeneratorRoute', 'dontYouForgetAboutJimnyRoute', 'outOfOfficeRoute', 'twoUpRoute', 'tapsFashionFaves',
    'coveredInChromeBrowserRoute', 'graphAverageMafsEpisodeRoute', 'graphRageAgainstTheLanyardRoute',
  ];

  const activeFlags = () => routeFlags.filter(f => component[f] === true);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('determineRoute', () => {
    const cases: [string, Flag][] = [
      ['/projects/the-big-one', 'theBigOneRoute'],
      ['/projects/the-big-one#faqs', 'theBigOneRoute'],
      ['/projects/bogan-of-meteorology', 'boganOfMeteorologyRoute'],
      ['/projects/bogan-of-meteorology/about', 'boganOfMeteorologyRoute'],
      ['/projects/rip-me-a-new-one', 'ripMeANewOneRoute'],
      ['/projects/its-five-oclock-somewhere', 'itsFiveOclockSomewhereRoute'],
      ['/projects/funny-password-checker', 'funnyPasswordCheckerRoute'],
      ['/projects/funny-password-checker/answers', 'funnyPasswordCheckerRoute'],
      ['/projects/quiet-near-a-little-stream', 'quietNearALittleStreamRoute'],
      ['/projects/internet-recipe', 'internetRecipeRoute'],
      ['/projects/internet-recipe/about', 'internetRecipeRoute'],
      ['/projects/trottadvisor', 'trottadvisorRoute'],
      ['/projects/bingo', 'bingoRoute'],
      ['/projects/family-it-invoice-generator', 'familyItInvoiceGeneratorRoute'],
      ['/projects/tappy-os', 'tappyOsRoute'],
      ['/projects/tappy-os/orkinisms', 'orkisimsRoute'],
      ['/projects/tappy-os/tappy-season-time', 'tappySeasonTimeRoute'],
      ['/projects/tappy-os/tappy-standard-time', 'tappyStandardTimeRoute'],
      ['/projects/tappy-os/dont-you-forget-about-jimny', 'dontYouForgetAboutJimnyRoute'],
      ['/projects/tappy-os/taps-fashion-faves', 'tapsFashionFaves'],
      ['/projects/out-of-office', 'outOfOfficeRoute'],
      ['/projects/out-of-office/about', 'outOfOfficeRoute'],
      ['/projects/two-up', 'twoUpRoute'],
      ['/projects/covered-in-chrome-browser', 'coveredInChromeBrowserRoute'],
      ['/projects/covered-in-chrome-browser/about', 'coveredInChromeBrowserRoute'],
      ['/graphs', 'graphsRoute'],
      ['/graphs/average-mafs-episode', 'graphAverageMafsEpisodeRoute'],
      ['/graphs/rage-against-the-lanyard', 'graphRageAgainstTheLanyardRoute'],
    ];

    it.each(cases)('%s turns on only %s', (url, flag) => {
      component.determineRoute(url);
      expect(activeFlags()).toEqual([flag]);
    });

    it.each(['/home', '/writing', '/blog', '/blog/some-post', '/projects', '/nano-narratives', '/the-good-book', '/testimonials'])(
      '%s uses the standard navbar', url => {
        component.determineRoute(url);
        expect(activeFlags()).toEqual(['standardRoute']);
      });

    it('only treats the exact /projects/tappy-os URL as the Tappy OS landing page', () => {
      component.determineRoute('/projects/tappy-os');
      expect(component.tappyOsRoute).toBe(true);

      component.determineRoute('/projects/tappy-os/orkinisms');
      expect(component.tappyOsRoute).toBe(false);
    });

    it('only treats the exact /graphs URL as the graphs landing page', () => {
      component.determineRoute('/graphs/average-mafs-episode');
      expect(component.graphsRoute).toBe(false);
    });

    it('clears the previous route when the route changes', () => {
      component.determineRoute('/projects/two-up');
      expect(component.twoUpRoute).toBe(true);

      component.determineRoute('/home');
      expect(component.twoUpRoute).toBe(false);
      expect(component.standardRoute).toBe(true);
    });
  });

  describe('resetRoutes', () => {
    it('turns every flag off', () => {
      component.determineRoute('/projects/two-up');
      component.resetRoutes();
      expect(activeFlags()).toEqual([]);
    });
  });

  describe('following the router', () => {
    it('updates the current route and flags after each navigation', async () => {
      const router = TestBed.inject(Router);

      await router.navigateByUrl('/projects/two-up');
      expect(component.currentRoute).toBe('/projects/two-up');
      expect(activeFlags()).toEqual(['twoUpRoute']);

      await router.navigateByUrl('/blog');
      expect(component.currentRoute).toBe('/blog');
      expect(activeFlags()).toEqual(['standardRoute']);
    });
  });

  describe('navbars', () => {
    const brandFor = async (url: string) => {
      await TestBed.inject(Router).navigateByUrl(url);
      fixture.detectChanges();
      return el.textContent!;
    };

    it('shows the site links on standard pages', async () => {
      const text = await brandFor('/home');
      for (const link of ['Writing', 'Blog', 'Graphs', 'Nano Narratives', 'Projects', 'Testimonials']) {
        expect(text, link).toContain(link);
      }
      expect(el.querySelector('a[href="/writing"]')).not.toBeNull();
      expect(el.querySelector('a[href="/projects"]')).not.toBeNull();
    });

    it('shows the site navbar on the graphs landing page', async () => {
      await brandFor('/graphs');
      expect(el.querySelector('a[href="/writing"]')).not.toBeNull();
    });

    it("shows the project's own navbar and drops the site links on a project page", async () => {
      const text = await brandFor('/projects/the-big-one');
      expect(text).toContain('The Big One FAQ');
      expect(el.querySelector('a[href="/writing"]')).toBeNull();
    });

    it('offers a way back to the projects page from a project', async () => {
      await brandFor('/projects/the-big-one');
      expect(el.querySelector('a#leftLink[href="/projects"]')).not.toBeNull();
    });

    it('offers a way back to Tappy OS from a Tappy OS sub-project', async () => {
      await brandFor('/projects/tappy-os/tappy-standard-time');
      expect(el.querySelector('a#leftLink[href="/projects/tappy-os"]')).not.toBeNull();
    });

    it('shows only one navbar at a time', async () => {
      await brandFor('/projects/the-big-one');
      expect(el.querySelectorAll('nav').length).toBe(1);
    });

    it.each(['/projects/two-up', '/projects/out-of-office', '/projects/covered-in-chrome-browser'])(
      '%s draws its own navbar, so the header shows none', async url => {
        await brandFor(url);
        expect(el.querySelectorAll('nav').length).toBe(0);
      });
  });

  describe('collapseNavbar', () => {
    function addNavbar(shown: boolean): HTMLElement {
      const nav = document.createElement('div');
      nav.id = 'testNav';
      if (shown) nav.classList.add('show');
      document.body.appendChild(nav);
      return nav;
    }

    function fakeBootstrap(existing: { hide: () => void } | null) {
      const hide = vi.fn();
      const ctor = vi.fn(function (this: { hide: () => void }) { this.hide = hide; });
      (globalThis as { bootstrap?: unknown }).bootstrap = { Collapse: Object.assign(ctor, { getInstance: vi.fn(() => existing) }) };
      return { hide, ctor };
    }

    it('hides an open navbar using the existing collapse instance', () => {
      const nav = addNavbar(true);
      const existing = { hide: vi.fn() };
      const { ctor } = fakeBootstrap(existing);

      component.collapseNavbar('testNav');

      expect(existing.hide).toHaveBeenCalledTimes(1);
      expect(ctor).not.toHaveBeenCalled();
      expect(nav).toBeTruthy();
    });

    it('creates a collapse instance when there is not one yet', () => {
      addNavbar(true);
      const { hide, ctor } = fakeBootstrap(null);

      component.collapseNavbar('testNav');

      expect(ctor).toHaveBeenCalledTimes(1);
      expect(hide).toHaveBeenCalledTimes(1);
    });

    it('does nothing when the navbar is already closed', () => {
      addNavbar(false);
      const { ctor } = fakeBootstrap(null);

      component.collapseNavbar('testNav');

      expect(ctor).not.toHaveBeenCalled();
    });

    it('does nothing when there is no such element', () => {
      const { ctor } = fakeBootstrap(null);
      expect(() => component.collapseNavbar('missing')).not.toThrow();
      expect(ctor).not.toHaveBeenCalled();
    });
  });
});
