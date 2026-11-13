import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { CoveredInChromeBrowser } from './covered-in-chrome-browser';
import { SONGS } from './songs';

const THEME_KEY = 'covered-in-chrome-theme';

describe('CoveredInChromeBrowser', () => {
  let component: CoveredInChromeBrowser;
  let fixture: ComponentFixture<CoveredInChromeBrowser>;
  let el: HTMLElement;

  // Controls what the matchMedia stub reports for prefers-color-scheme: dark.
  let systemDark: boolean;
  // Every ResizeObserver the component creates, so tests can fire its callback.
  let observers: { callback: () => void; observe: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> }[];

  beforeEach(async () => {
    localStorage.clear();
    document.head.querySelectorAll("link[rel~='icon']").forEach(l => l.remove());
    systemDark = false;
    observers = [];

    // jsdom doesn't implement matchMedia, which the component uses for the initial theme.
    window.matchMedia = ((query: string) => ({
      matches: systemDark,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;

    // ...nor ResizeObserver, which the component uses after view init.
    globalThis.ResizeObserver = class {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      constructor(public callback: () => void) {
        observers.push(this);
      }
    } as unknown as typeof ResizeObserver;

    await TestBed.configureTestingModule({
      imports: [CoveredInChromeBrowser],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function create(): void {
    fixture = TestBed.createComponent(CoveredInChromeBrowser);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
  }

  const q = <T extends HTMLElement>(selector: string) => el.querySelector<T>(selector)!;
  const qa = <T extends HTMLElement>(selector: string) => Array.from(el.querySelectorAll<T>(selector));
  const click = (target: HTMLElement) => {
    target.click();
    fixture.detectChanges();
  };
  const activeSong = () => component.activeSongId();
  const bookmarkTitles = () => qa('.bookmark-list .bookmark').map(b => b.getAttribute('title'));

  describe('creation', () => {
    it('should create', () => {
      create();
      expect(component).toBeTruthy();
    });

    it('sets the page title', () => {
      create();
      expect(TestBed.inject(Title).getTitle()).toBe('(Covered in) Chrome Browser - Projects');
    });

    it('opens a single tab on the first song', () => {
      create();
      expect(component.tabs().length).toBe(1);
      expect(activeSong()).toBe(SONGS[0].id);
      expect(component.url()).toBe(`youtube.com/watch?v=${SONGS[0].id}`);
    });

    it('renders a bookmark for every song', () => {
      create();
      expect(bookmarkTitles()).toEqual(SONGS.map(s => s.title));
    });

    it('renders one iframe per tab', () => {
      create();
      expect(qa('iframe').length).toBe(1);
      expect(qa('iframe')[0].getAttribute('title')).toBe('Violent Soho - Covered in Chrome - YouTube');
    });
  });

  describe('favicon and body classes', () => {
    it('sets the Chrome favicon and body classes', () => {
      create();
      const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")!;
      expect(link.getAttribute('href')).toBe('assets/images/favicons/cic-favicon.png');
      expect(document.body.classList.contains('cic-body')).toBe(true);
    });

    it('restores a previous .ico favicon on destroy', () => {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.setAttribute('href', 'favicon.ico');
      document.head.appendChild(link);

      create();
      fixture.destroy();

      expect(link.getAttribute('href')).toBe('favicon.ico');
      expect(link.type).toBe('image/x-icon');
    });

    it('restores a previous png favicon on destroy', () => {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.setAttribute('href', 'other.png');
      document.head.appendChild(link);

      create();
      fixture.destroy();

      expect(link.getAttribute('href')).toBe('other.png');
      expect(link.type).toBe('image/png');
    });

    it('leaves the favicon alone on destroy when there was none before', () => {
      create();
      fixture.destroy();
      const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")!;
      expect(link.getAttribute('href')).toBe('assets/images/favicons/cic-favicon.png');
    });

    it('can be destroyed before its view was ever initialised', () => {
      fixture = TestBed.createComponent(CoveredInChromeBrowser); // no detectChanges: ngAfterViewInit never runs
      expect(() => fixture.destroy()).not.toThrow();
      expect(observers.length).toBe(0);
    });

    it('removes its body classes and disconnects the observer on destroy', () => {
      create();
      fixture.destroy();
      expect(document.body.classList.contains('cic-body')).toBe(false);
      expect(document.body.classList.contains('cic-dark')).toBe(false);
      expect(observers[0].disconnect).toHaveBeenCalled();
    });
  });

  describe('theme', () => {
    it('follows the system theme when nothing is saved (light)', () => {
      systemDark = false;
      create();
      expect(component.dark()).toBe(false);
      expect(document.body.classList.contains('cic-dark')).toBe(false);
    });

    it('follows the system theme when nothing is saved (dark)', () => {
      systemDark = true;
      create();
      expect(component.dark()).toBe(true);
      expect(document.body.classList.contains('cic-dark')).toBe(true);
    });

    it('prefers a saved dark choice over the system theme', () => {
      systemDark = false;
      localStorage.setItem(THEME_KEY, 'dark');
      create();
      expect(component.dark()).toBe(true);
    });

    it('prefers a saved light choice over the system theme', () => {
      systemDark = true;
      localStorage.setItem(THEME_KEY, 'light');
      create();
      expect(component.dark()).toBe(false);
    });

    it('falls back to the system theme when storage is unavailable', () => {
      systemDark = true;
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('blocked');
      });
      create();
      expect(component.dark()).toBe(true);
    });

    it('toggles and remembers the choice', () => {
      create();
      component.toggleTheme();
      expect(component.dark()).toBe(true);
      expect(localStorage.getItem(THEME_KEY)).toBe('dark');

      component.toggleTheme();
      expect(component.dark()).toBe(false);
      expect(localStorage.getItem(THEME_KEY)).toBe('light');
    });

    it('still toggles when storage cannot be written', () => {
      create();
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('blocked');
      });
      expect(() => component.toggleTheme()).not.toThrow();
      expect(component.dark()).toBe(true);
    });

    it('toggles from the toolbar button and updates its label and body class', () => {
      create();
      const button = q('button[title="Switch to dark theme"]');
      expect(button.getAttribute('aria-label')).toBe('Switch to dark theme');

      click(button);

      expect(document.body.classList.contains('cic-dark')).toBe(true);
      const back = q('button[title="Switch to light theme"]');
      expect(back.getAttribute('aria-label')).toBe('Switch to light theme');
    });
  });

  describe('titles', () => {
    it('songTitle returns the title for a known id and "" for an unknown id', () => {
      create();
      expect(component.songTitle(SONGS[1].id)).toBe(SONGS[1].title);
      expect(component.songTitle('nope')).toBe('');
    });

    it('tabTitle describes the song the tab is on', () => {
      create();
      expect(component.tabTitle(component.tabs()[0])).toBe('Violent Soho - Covered in Chrome - YouTube');
    });
  });

  describe('tabs', () => {
    it('newTab opens and activates a tab on a song not already open', () => {
      create();
      component.newTab();
      fixture.detectChanges();

      expect(component.tabs().length).toBe(2);
      expect(component.activeId()).toBe(component.tabs()[1].id);
      expect(activeSong()).not.toBe(SONGS[0].id);
      expect(qa('.tab').length).toBe(2);
      expect(qa('iframe').length).toBe(2);
    });

    it('newTab picks from the songs not yet open, using Math.random', () => {
      create();
      vi.spyOn(Math, 'random').mockReturnValue(0);
      component.newTab();
      // Pool is every song except the first (already open); index 0 of that is SONGS[1].
      expect(activeSong()).toBe(SONGS[1].id);
    });

    it('newTab reuses songs once every song is already open', () => {
      create();
      for (let i = 1; i < SONGS.length; i++) component.newTab();
      expect(new Set(component.tabs().map(t => t.history[0])).size).toBe(SONGS.length);

      component.newTab();
      expect(component.tabs().length).toBe(SONGS.length + 1);
      expect(SONGS.map(s => s.id)).toContain(activeSong());
    });

    it('clicking the new tab button opens a tab', () => {
      create();
      click(q('.new-tab'));
      expect(component.tabs().length).toBe(2);
    });

    it('selectTab activates the tab', () => {
      create();
      component.newTab();
      const first = component.tabs()[0];
      component.selectTab(first);
      expect(component.activeId()).toBe(first.id);
    });

    it('clicking a tab selects it and marks it active', () => {
      create();
      component.newTab();
      fixture.detectChanges();

      click(qa('.tab')[0]);

      expect(component.activeId()).toBe(component.tabs()[0].id);
      expect(qa('.tab')[0].classList.contains('active')).toBe(true);
      expect(qa('.tab')[0].getAttribute('aria-selected')).toBe('true');
      expect(qa('.tab')[1].getAttribute('aria-selected')).toBe('false');
      expect(qa('iframe')[0].hasAttribute('hidden')).toBe(false);
      expect(qa('iframe')[1].hasAttribute('hidden')).toBe(true);
    });

    it('closing the active tab activates its neighbour', () => {
      create();
      component.newTab();
      component.newTab();
      const [a, b, c] = component.tabs();
      component.selectTab(b);

      component.closeTab(b, new Event('click'));

      expect(component.tabs().map(t => t.id)).toEqual([a.id, c.id]);
      expect(component.activeId()).toBe(c.id);
    });

    it('closing the last tab in the strip activates the new last tab', () => {
      create();
      component.newTab();
      const [a, b] = component.tabs();

      component.closeTab(b, new Event('click'));

      expect(component.activeId()).toBe(a.id);
    });

    it('closing an inactive tab keeps the active tab', () => {
      create();
      component.newTab();
      const [a, b] = component.tabs();
      expect(component.activeId()).toBe(b.id);

      component.closeTab(a, new Event('click'));

      expect(component.tabs().map(t => t.id)).toEqual([b.id]);
      expect(component.activeId()).toBe(b.id);
    });

    it('closing the only tab opens a fresh one on a different song', () => {
      create();
      const only = component.tabs()[0];
      const closedSong = only.history[0];

      component.closeTab(only, new Event('click'));

      expect(component.tabs().length).toBe(1);
      expect(component.tabs()[0].id).not.toBe(only.id);
      expect(activeSong()).not.toBe(closedSong);
      expect(component.activeId()).toBe(component.tabs()[0].id);
    });

    it('closeTab stops the event from also selecting the tab', () => {
      create();
      const event = new Event('click');
      const stop = vi.spyOn(event, 'stopPropagation');
      component.closeTab(component.tabs()[0], event);
      expect(stop).toHaveBeenCalled();
    });

    it('the close button closes its tab without selecting a different one', () => {
      create();
      component.newTab();
      fixture.detectChanges();

      click(qa('.tab .close')[0]);

      expect(component.tabs().length).toBe(1);
      expect(qa('.tab').length).toBe(1);
    });

    it('middle-clicking (auxclick) a tab closes it', () => {
      create();
      component.newTab();
      fixture.detectChanges();

      qa('.tab')[0].dispatchEvent(new MouseEvent('auxclick', { bubbles: true, button: 1 }));
      fixture.detectChanges();

      expect(component.tabs().length).toBe(1);
    });
  });

  describe('navigation', () => {
    it('starts with back and forward disabled', () => {
      create();
      expect(component.canGoBack()).toBe(false);
      expect(component.canGoForward()).toBe(false);
      expect(q<HTMLButtonElement>('button[title="Back"]').disabled).toBe(true);
      expect(q<HTMLButtonElement>('button[title="Forward"]').disabled).toBe(true);
    });

    it('opening a bookmark navigates the active tab and enables back', () => {
      create();
      const song = SONGS[3];
      const event = new Event('click', { cancelable: true });

      component.openBookmark(song, event);

      expect(event.defaultPrevented).toBe(true);
      expect(activeSong()).toBe(song.id);
      expect(component.canGoBack()).toBe(true);
      expect(component.canGoForward()).toBe(false);
      expect(component.tabs().length).toBe(1);
    });

    it('clicking a bookmark link navigates without following the href', () => {
      create();
      const link = qa<HTMLAnchorElement>('.bookmark-list .bookmark')[2];
      expect(link.getAttribute('href')).toBe(`https://www.youtube.com/watch?v=${SONGS[2].id}`);

      click(link);

      expect(activeSong()).toBe(SONGS[2].id);
      expect(q<HTMLInputElement>('input').value).toBe(`youtube.com/watch?v=${SONGS[2].id}`);
      expect(q('iframe').getAttribute('title')).toBe(`Violent Soho - ${SONGS[2].title} - YouTube`);
    });

    it('back and forward move through history', () => {
      create();
      component.openBookmark(SONGS[1], new Event('click'));
      component.openBookmark(SONGS[2], new Event('click'));

      component.back();
      expect(activeSong()).toBe(SONGS[1].id);
      expect(component.canGoBack()).toBe(true);
      expect(component.canGoForward()).toBe(true);

      component.back();
      expect(activeSong()).toBe(SONGS[0].id);
      expect(component.canGoBack()).toBe(false);

      component.forward();
      component.forward();
      expect(activeSong()).toBe(SONGS[2].id);
      expect(component.canGoForward()).toBe(false);
    });

    it('back and forward do nothing at the ends of history', () => {
      create();
      component.back();
      component.forward();
      expect(activeSong()).toBe(SONGS[0].id);
      expect(component.tabs()[0].index).toBe(0);
    });

    it('navigating after going back drops the forward history', () => {
      create();
      component.openBookmark(SONGS[1], new Event('click'));
      component.openBookmark(SONGS[2], new Event('click'));
      component.back();

      component.openBookmark(SONGS[3], new Event('click'));

      expect(component.tabs()[0].history).toEqual([SONGS[0].id, SONGS[1].id, SONGS[3].id]);
      expect(component.canGoForward()).toBe(false);
    });

    it('back and forward buttons work from the toolbar', () => {
      create();
      component.openBookmark(SONGS[1], new Event('click'));
      fixture.detectChanges();

      click(q('button[title="Back"]'));
      expect(activeSong()).toBe(SONGS[0].id);

      click(q('button[title="Forward"]'));
      expect(activeSong()).toBe(SONGS[1].id);
    });

    it('history is kept per tab', () => {
      create();
      component.openBookmark(SONGS[1], new Event('click'));
      component.newTab();
      expect(component.canGoBack()).toBe(false);

      component.selectTab(component.tabs()[0]);
      expect(component.canGoBack()).toBe(true);
    });

    it('navigating one tab leaves the other tabs untouched', () => {
      create();
      component.newTab();
      const [first, second] = component.tabs();
      component.selectTab(first);

      component.openBookmark(SONGS[5], new Event('click'));
      component.reload();

      const [firstAfter, secondAfter] = component.tabs();
      expect(firstAfter.history).toEqual([SONGS[0].id, SONGS[5].id]);
      expect(secondAfter).toBe(second);
    });

    it('navigation methods are safe when there is no active tab', () => {
      create();
      component.activeId.set(-1);

      expect(() => {
        component.back();
        component.forward();
        component.reload();
        component.openBookmark(SONGS[1], new Event('click'));
      }).not.toThrow();
      expect(component.canGoBack()).toBe(false);
      expect(component.canGoForward()).toBe(false);
      expect(activeSong()).toBe(SONGS[0].id);
    });

    it('reload keeps the song and history but changes the iframe src', () => {
      create();
      const before = component.tabs()[0];

      component.reload();

      const after = component.tabs()[0];
      expect(after.history).toEqual(before.history);
      expect(after.index).toBe(before.index);
      expect(after.src).not.toBe(before.src);
      expect(JSON.stringify(after.src)).not.toEqual(JSON.stringify(before.src));
    });

    it('reload button reloads', () => {
      create();
      const before = component.tabs()[0].src;
      click(q('button[title="Reload"]'));
      expect(component.tabs()[0].src).not.toBe(before);
    });

    it('embed URLs get a distinct reload counter each time', () => {
      create();
      const srcs = new Set<string>();
      for (let i = 0; i < 3; i++) {
        component.reload();
        srcs.add(String((component.tabs()[0].src as any).changingThisBreaksApplicationSecurity));
      }
      expect(srcs.size).toBe(3);
      srcs.forEach(s => expect(s).toContain(`https://www.youtube-nocookie.com/embed/${SONGS[0].id}?autoplay=1&rel=0&r=`));
    });
  });

  describe('omnibox', () => {
    it('shows the current url', () => {
      create();
      expect(q<HTMLInputElement>('input').value).toBe(`youtube.com/watch?v=${SONGS[0].id}`);
    });

    it('submitting lands on a different random song and blurs the input', () => {
      create();
      const input = q<HTMLInputElement>('input');
      const blur = vi.spyOn(input, 'blur');
      const event = new Event('submit', { cancelable: true });

      component.submitOmnibox(event);

      expect(event.defaultPrevented).toBe(true);
      expect(blur).toHaveBeenCalled();
      expect(activeSong()).not.toBe(SONGS[0].id);
      expect(component.canGoBack()).toBe(true);
    });

    it('submitting the form from the DOM navigates', () => {
      create();
      q('form').dispatchEvent(new Event('submit', { cancelable: true }));
      fixture.detectChanges();
      expect(activeSong()).not.toBe(SONGS[0].id);
    });

    it('focusing the input selects its text', () => {
      create();
      const input = q<HTMLInputElement>('input');
      const select = vi.spyOn(input, 'select');
      input.dispatchEvent(new Event('focus'));
      expect(select).toHaveBeenCalled();
    });

    it('Escape restores the current url and blurs', () => {
      create();
      const input = q<HTMLInputElement>('input');
      input.value = 'something typed';
      const blur = vi.spyOn(input, 'blur');

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(input.value).toBe(component.url());
      expect(blur).toHaveBeenCalled();
    });

    it('resetOmnibox restores the current url', () => {
      create();
      const input = q<HTMLInputElement>('input');
      input.value = 'x';
      component.resetOmnibox();
      expect(input.value).toBe(`youtube.com/watch?v=${SONGS[0].id}`);
    });
  });

  describe('bookmark overflow', () => {
    // jsdom has no layout, so fake each bookmark as 100px wide in a 450px list.
    function fakeLayout(listWidth: number, itemWidth = 100): void {
      const list = q('.bookmark-list');
      Object.defineProperty(list, 'clientWidth', { value: listWidth, configurable: true });
      Array.from(list.children).forEach((child, i) => {
        Object.defineProperty(child, 'offsetLeft', { value: i * itemWidth, configurable: true });
        Object.defineProperty(child, 'offsetWidth', { value: itemWidth, configurable: true });
      });
    }
    const relayout = () => {
      observers[0].callback();
      fixture.detectChanges();
    };

    it('observes the bookmark list and lays it out once on init', () => {
      create();
      expect(observers.length).toBe(1);
      expect(observers[0].observe).toHaveBeenCalledWith(q('.bookmark-list'));
    });

    it('shows every bookmark and hides the » button when they all fit', () => {
      create();
      expect(component.hiddenFrom()).toBe(SONGS.length);
      expect(component.overflowSongs()).toEqual([]);
      expect(q('.overflow-btn').classList.contains('invisible')).toBe(true);
      expect(qa('.bookmark-list .bookmark.gone').length).toBe(0);
    });

    it('moves bookmarks that do not fit into the » menu', () => {
      create();
      fakeLayout(450);
      relayout();

      // Items 0-3 end at or before 450px; item 4 ends at 500px.
      expect(component.hiddenFrom()).toBe(4);
      expect(component.overflowSongs().length).toBe(SONGS.length - 4);
      expect(q('.overflow-btn').classList.contains('invisible')).toBe(false);
      expect(qa('.bookmark-list .bookmark.gone').length).toBe(SONGS.length - 4);
      expect(qa('.bookmark-list .bookmark')[3].classList.contains('gone')).toBe(false);
      expect(qa('.bookmark-list .bookmark')[4].classList.contains('gone')).toBe(true);
    });

    it('re-fits bookmarks when the list grows again', () => {
      create();
      fakeLayout(450);
      relayout();
      expect(component.hiddenFrom()).toBe(4);

      fakeLayout(10_000);
      relayout();
      expect(component.hiddenFrom()).toBe(SONGS.length);
    });

    it('opens and closes the » menu with its button', () => {
      create();
      fakeLayout(450);
      relayout();
      expect(q('.overflow-menu')).toBeNull();

      click(q('.overflow-btn'));
      expect(component.overflowOpen()).toBe(true);
      expect(qa('.overflow-menu .bookmark').map(b => b.getAttribute('title')))
        .toEqual(SONGS.slice(4).map(s => s.title));

      click(q('.overflow-btn'));
      expect(component.overflowOpen()).toBe(false);
      expect(q('.overflow-menu')).toBeNull();
    });

    it('toggleOverflow stops the click reaching the document handler', () => {
      create();
      const event = new Event('click');
      const stop = vi.spyOn(event, 'stopPropagation');
      component.toggleOverflow(event);
      expect(stop).toHaveBeenCalled();
    });

    it('closes the » menu when clicking elsewhere on the document', () => {
      create();
      component.overflowOpen.set(true);
      document.dispatchEvent(new Event('click'));
      expect(component.overflowOpen()).toBe(false);
    });

    it('opening a bookmark from the » menu navigates and closes the menu', () => {
      create();
      fakeLayout(450);
      relayout();
      click(q('.overflow-btn'));

      click(qa('.overflow-menu .bookmark')[0]);

      expect(activeSong()).toBe(SONGS[4].id);
      expect(component.overflowOpen()).toBe(false);
      expect(q('.overflow-menu')).toBeNull();
    });
  });
});
