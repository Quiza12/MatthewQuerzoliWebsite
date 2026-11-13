import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RageAgainstTheLanyardGraph } from './rage-against-the-lanyard';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { pageTitleTest } from '../../testing/page-chrome';

describe('RageAgainstTheLanyardGraph', () => {
  let component: RageAgainstTheLanyardGraph;
  let fixture: ComponentFixture<RageAgainstTheLanyardGraph>;
  let preload: { preloadExternalCdnsOnLoad: ReturnType<typeof vi.fn> };
  let originalOnload: typeof window.onload;

  beforeEach(async () => {
    originalOnload = window.onload;
    preload = { preloadExternalCdnsOnLoad: vi.fn().mockResolvedValue(true) };
    await TestBed.configureTestingModule({
      imports: [RageAgainstTheLanyardGraph],
      providers: [{ provide: ExternalJavascriptCdnPreloadService, useValue: preload }],
    }).compileComponents();
  });

  afterEach(() => {
    window.onload = originalOnload;
  });

  function create(): ComponentFixture<RageAgainstTheLanyardGraph> {
    fixture = TestBed.createComponent(RageAgainstTheLanyardGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageTitleTest({ create: () => create(), title: 'Rage Against the Lanyard - Graphs' });

  it('preloads the chart and graph scripts on init', () => {
    create();
    expect(preload.preloadExternalCdnsOnLoad).toHaveBeenCalledWith(['chart', 'rageagainstthelanyard'], 'Rage Against the Lanyard');
  });

  it('runs the custom script once the scripts have loaded', async () => {
    create();
    await fixture.whenStable();
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
