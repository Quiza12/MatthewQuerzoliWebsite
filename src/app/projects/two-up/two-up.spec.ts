import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { TwoUp } from './two-up';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { pageChromeTests } from '../../testing/page-chrome';

describe('TwoUp', () => {
  let component: TwoUp;
  let fixture: ComponentFixture<TwoUp>;
  let preload: { preloadExternalCdnsOnLoad: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    preload = { preloadExternalCdnsOnLoad: vi.fn().mockResolvedValue(true) };
    await TestBed.configureTestingModule({
      imports: [TwoUp],
      providers: [
        provideRouter([]),
        { provide: ExternalJavascriptCdnPreloadService, useValue: preload },
      ],
    }).compileComponents();
  });

  function create(): ComponentFixture<TwoUp> {
    fixture = TestBed.createComponent(TwoUp);
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
    title: 'Two-Up - Projects',
    favicon: 'assets/images/favicons/two-up-favicon.png',
  });

  it('preloads the two-up script on init', () => {
    create();
    expect(preload.preloadExternalCdnsOnLoad).toHaveBeenCalledWith(['twoup'], 'Two Up');
  });

  it('links back to the projects page', () => {
    create();
    const link = fixture.nativeElement.querySelector('a[href="/projects"]');
    expect(link).not.toBeNull();
  });

  it('renders the heading', () => {
    create();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('Two-Up');
  });
});
