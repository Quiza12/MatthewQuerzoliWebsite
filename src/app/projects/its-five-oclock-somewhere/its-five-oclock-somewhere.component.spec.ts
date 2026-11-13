import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsFiveOclockSomewhereComponent } from './its-five-oclock-somewhere.component';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { pageChromeTests } from '../../testing/page-chrome';

describe('ItsFiveOclockSomewhereComponent', () => {
  let component: ItsFiveOclockSomewhereComponent;
  let fixture: ComponentFixture<ItsFiveOclockSomewhereComponent>;
  let preload: { preloadExternalCdnsOnLoad: ReturnType<typeof vi.fn> };
  let originalOnload: typeof window.onload;

  beforeEach(async () => {
    originalOnload = window.onload;
    preload = { preloadExternalCdnsOnLoad: vi.fn().mockResolvedValue(true) };
    await TestBed.configureTestingModule({
      imports: [ItsFiveOclockSomewhereComponent],
      providers: [{ provide: ExternalJavascriptCdnPreloadService, useValue: preload }],
    }).compileComponents();
  });

  afterEach(() => {
    window.onload = originalOnload;
  });

  function create(): ComponentFixture<ItsFiveOclockSomewhereComponent> {
    fixture = TestBed.createComponent(ItsFiveOclockSomewhereComponent);
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
    title: "It's Five O'Clock Somewhere - Projects",
    favicon: 'assets/images/favicons/its-five-oclock-somewhere-favicon.png',
  });

  it('preloads its scripts on init', () => {
    create();
    expect(preload.preloadExternalCdnsOnLoad).toHaveBeenCalledWith(['itsfiveoclocksomewhere'], "It's Five O'Clock Somewhere");
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
