import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { CoveredInChromeAbout } from './cic-about';

const THEME_KEY = 'covered-in-chrome-theme';

describe('CoveredInChromeAbout', () => {
  let fixture: ComponentFixture<CoveredInChromeAbout>;
  let systemDark: boolean;

  beforeEach(async () => {
    localStorage.clear();
    document.head.querySelectorAll("link[rel~='icon']").forEach(l => l.remove());
    document.body.className = '';
    systemDark = false;

    // jsdom doesn't implement matchMedia.
    window.matchMedia = ((query: string) => ({
      matches: systemDark,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
    })) as unknown as typeof window.matchMedia;

    await TestBed.configureTestingModule({
      imports: [CoveredInChromeAbout],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function create(): void {
    fixture = TestBed.createComponent(CoveredInChromeAbout);
    fixture.detectChanges();
  }

  it('should create', () => {
    create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('sets the page title', () => {
    create();
    expect(TestBed.inject(Title).getTitle()).toBe('(Covered in) Chrome Browser - Projects');
  });

  it('sets the Chrome favicon', () => {
    create();
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")!;
    expect(link.getAttribute('href')).toBe('assets/images/icons/google-chrome-icon.png');
  });

  it('applies the body classes, light by default', () => {
    create();
    expect(document.body.classList.contains('cic-body')).toBe(true);
    expect(document.body.classList.contains('cic-dark')).toBe(false);
    expect(document.body.classList.contains('info-dark')).toBe(false);
  });

  it('goes dark when the system theme is dark and nothing is saved', () => {
    systemDark = true;
    create();
    expect(document.body.classList.contains('cic-dark')).toBe(true);
    expect(document.body.classList.contains('info-dark')).toBe(true);
  });

  it('prefers a saved dark choice over a light system theme', () => {
    localStorage.setItem(THEME_KEY, 'dark');
    create();
    expect(document.body.classList.contains('cic-dark')).toBe(true);
  });

  it('prefers a saved light choice over a dark system theme', () => {
    systemDark = true;
    localStorage.setItem(THEME_KEY, 'light');
    create();
    expect(document.body.classList.contains('cic-dark')).toBe(false);
  });

  it('falls back to the system theme when storage is unavailable', () => {
    systemDark = true;
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    create();
    expect(document.body.classList.contains('cic-dark')).toBe(true);
  });

  it('removes its body classes on destroy', () => {
    systemDark = true;
    create();
    fixture.destroy();
    expect(document.body.classList.contains('cic-body')).toBe(false);
    expect(document.body.classList.contains('cic-dark')).toBe(false);
    expect(document.body.classList.contains('info-dark')).toBe(false);
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
    expect(link.getAttribute('href')).toBe('assets/images/icons/google-chrome-icon.png');
  });
});
