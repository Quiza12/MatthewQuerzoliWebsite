import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { TheBigOneComponent } from './the-big-one.component';
import { ExternalJavascriptCdnPreloadService } from '../../services/external-js-preload/external-javascript-cdn-preload.service';
import { pageChromeTests } from '../../testing/page-chrome';

describe('TheBigOneComponent', () => {
  let component: TheBigOneComponent;
  let fixture: ComponentFixture<TheBigOneComponent>;
  let fragment: BehaviorSubject<string | null>;
  let preload: { preloadExternalCdnsOnLoad: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    fragment = new BehaviorSubject<string | null>(null);
    preload = { preloadExternalCdnsOnLoad: vi.fn().mockResolvedValue(true) };
    // jsdom doesn't implement scrollIntoView.
    Element.prototype.scrollIntoView = vi.fn();

    await TestBed.configureTestingModule({
      imports: [TheBigOneComponent],
      providers: [
        provideRouter([]),
        { provide: ExternalJavascriptCdnPreloadService, useValue: preload },
        { provide: ActivatedRoute, useValue: { fragment } },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    document.querySelectorAll('.scroll-target').forEach(e => e.remove());
  });

  function create(): ComponentFixture<TheBigOneComponent> {
    fixture = TestBed.createComponent(TheBigOneComponent);
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
    title: 'The Big One FAQ - Projects',
    favicon: 'assets/images/favicons/the-big-one-favicon.png',
  });

  it('preloads the chart and the-big-one scripts on init', () => {
    create();
    expect(preload.preloadExternalCdnsOnLoad).toHaveBeenCalledWith(['chart', 'thebigone'], 'The Big One');
  });

  describe('fragment scrolling', () => {
    function addTarget(id: string): HTMLElement {
      const target = document.createElement('div');
      target.id = id;
      target.className = 'scroll-target';
      document.body.appendChild(target);
      target.scrollIntoView = vi.fn();
      return target;
    }

    it('scrolls to the element named by the route fragment', () => {
      const target = addTarget('favourite-food');
      create();

      fragment.next('favourite-food');

      expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('does nothing when the fragment matches no element', () => {
      const target = addTarget('somewhere-else');
      create();

      expect(() => fragment.next('does-not-exist')).not.toThrow();
      expect(target.scrollIntoView).not.toHaveBeenCalled();
    });

    it('does nothing when there is no fragment', () => {
      create();

      expect(() => fragment.next(null)).not.toThrow();
      expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
    });
  });
});
