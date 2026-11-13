import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TappyStandardTimeComponent } from './tappy-standard-time.component';
import { ExternalJavascriptCdnPreloadService } from '../../../services/external-js-preload/external-javascript-cdn-preload.service';
import { pageChromeTests } from '../../../testing/page-chrome';

describe('TappyStandardTimeComponent', () => {
  let component: TappyStandardTimeComponent;
  let fixture: ComponentFixture<TappyStandardTimeComponent>;
  let preload: { preloadExternalCdnsOnLoad: ReturnType<typeof vi.fn> };
  let originalOnload: typeof window.onload;

  beforeEach(async () => {
    originalOnload = window.onload;
    preload = { preloadExternalCdnsOnLoad: vi.fn().mockResolvedValue(true) };
    await TestBed.configureTestingModule({
      imports: [TappyStandardTimeComponent],
      providers: [{ provide: ExternalJavascriptCdnPreloadService, useValue: preload }],
    }).compileComponents();
  });

  afterEach(() => {
    window.onload = originalOnload;
  });

  function create(): ComponentFixture<TappyStandardTimeComponent> {
    fixture = TestBed.createComponent(TappyStandardTimeComponent);
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
    title: 'Tappy Standard Time - Tappy OS - Projects',
    favicon: 'assets/images/favicons/tappy-standard-time-favicon.png',
  });

  it('preloads its scripts on init', () => {
    create();
    expect(preload.preloadExternalCdnsOnLoad).toHaveBeenCalledWith(['moment', 'tappystandardtime'], 'Tappy Standard Time');
  });

  it('runs the custom script once the scripts have loaded', async () => {
    create();
    await fixture.whenStable(); // let the call made from ngOnInit finish first
    const init = vi.spyOn(component, 'initialiseCustomJs');

    await component.preloadExternalCdnsOnLoad();

    expect(init).toHaveBeenCalledTimes(1);
  });

  it('initialiseCustomJs calls window.onload when it is a function', () => {
    create();
    const onload = vi.fn();
    window.onload = onload;

    component.initialiseCustomJs();

    expect(onload).toHaveBeenCalledTimes(1);
  });

  it('initialiseCustomJs does nothing when window.onload is not a function', () => {
    create();
    window.onload = null;

    expect(() => component.initialiseCustomJs()).not.toThrow();
  });
});
