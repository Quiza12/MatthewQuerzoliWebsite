import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetRecipeComponent } from './internet-recipe.component';
import { fillerParagraphs, initialParagraphs } from './data/paragraphs';
import { imageIndex } from './data/image-index';
import { ContentItem } from './interfaces/ir-interfaces';
import { pageChromeTests } from '../../testing/page-chrome';

describe('InternetRecipeComponent', () => {
  let component: InternetRecipeComponent;
  let fixture: ComponentFixture<InternetRecipeComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    await TestBed.configureTestingModule({
      imports: [InternetRecipeComponent],
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function create(): ComponentFixture<InternetRecipeComponent> {
    fixture = TestBed.createComponent(InternetRecipeComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
    return fixture;
  }

  const textItems = (items: ContentItem[]) => items.filter(i => i.type === 'text');
  const imageItems = (items: ContentItem[]) => items.filter(i => i.type === 'image');

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => create(),
    title: 'INTERNET RECIPE - Projects',
    favicon: 'assets/images/favicons/internet-recipe-favicon.png',
  });

  describe('initial content', () => {
    it('starts with the fixed opening paragraphs and nothing appended', () => {
      create();
      expect(component.initialArray).toEqual(initialParagraphs);
      expect(component.array).toEqual([]);
      expect(component.sum).toBe(initialParagraphs.length);
    });

    it('renders the opening paragraphs', () => {
      create();
      expect(el.querySelectorAll('.scroll-container p').length).toBe(initialParagraphs.length);
    });
  });

  describe('onScrollDown', () => {
    it('appends more content and records the scroll direction', () => {
      create();
      component.onScrollDown();
      expect(component.array.length).toBeGreaterThanOrEqual(component.itemsToAppend);
      expect(component.direction).toBe('down');
    });

    it('renders the appended paragraphs', () => {
      create();
      component.onScrollDown();
      fixture.detectChanges();

      const expected = initialParagraphs.length + textItems(component.array).length;
      expect(el.querySelectorAll('.scroll-container p').length).toBe(expected);
    });

    it('keeps growing on each scroll', () => {
      create();
      component.onScrollDown();
      const after1 = component.array.length;
      component.onScrollDown();
      expect(component.array.length).toBeGreaterThan(after1);
    });
  });

  describe('getRandomParagraphsNoRepeatWithRandomImage', () => {
    beforeEach(() => create());

    it('returns the requested number of distinct filler paragraphs', () => {
      // Count up through the paragraphs so the picks are distinct; 0.99 would otherwise pick the same one forever.
      let call = 0;
      vi.spyOn(Math, 'random').mockImplementation(() => (call++ % fillerParagraphs.length) / fillerParagraphs.length);
      const result = textItems(component.getRandomParagraphsNoRepeatWithRandomImage(fillerParagraphs, 5));

      expect(result.length).toBe(5);
      expect(new Set(result.map(r => r.value)).size).toBe(5);
    });

    it('with real randomness, never repeats a paragraph in one batch', () => {
      for (let i = 0; i < 20; i++) {
        const result = textItems(component.getRandomParagraphsNoRepeatWithRandomImage(fillerParagraphs, 7));
        expect(new Set(result.map(r => r.value)).size).toBe(7);
        expect(result.every(r => fillerParagraphs.some(p => p.value === r.value))).toBe(true);
      }
    });

    it('never asks for more paragraphs than exist', () => {
      const result = textItems(component.getRandomParagraphsNoRepeatWithRandomImage(fillerParagraphs, 1000));
      expect(result.length).toBe(fillerParagraphs.length);
    });

    it('adds a trailing image when the image roll succeeds', () => {
      let call = 0;
      // Distinct text picks while the image roll (the last call) stays under the 0.6 chance.
      vi.spyOn(Math, 'random').mockImplementation(() => (call++ === 0 ? 0 : 0.5));
      const result = component.getRandomParagraphsNoRepeatWithRandomImage(fillerParagraphs, 1);

      expect(result.length).toBe(2);
      expect(result[1].type).toBe('image');
    });

    it('adds no image when the image roll fails', () => {
      let call = 0;
      vi.spyOn(Math, 'random').mockImplementation(() => (call++ < 3 ? call / 20 : 0.99));
      const result = component.getRandomParagraphsNoRepeatWithRandomImage(fillerParagraphs, 3);
      expect(imageItems(result).length).toBe(0);
    });
  });

  describe('images', () => {
    beforeEach(() => create());

    it('getRandomImageNoRepeat returns an image item below the generation chance', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.1);
      const item = component.getRandomImageNoRepeat()!;
      expect(item.type).toBe('image');
      expect(item.value.startsWith(component.imgBaseSlug)).toBe(true);
    });

    it('getRandomImageNoRepeat returns undefined at or above the generation chance', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.6);
      expect(component.getRandomImageNoRepeat()).toBeUndefined();
    });

    it('getRandomImageIndexNoRepeat returns a known image under the base path when the roll differs from the last', () => {
      imageIndex.forEach((name, i) => {
        component.prevIndex = (i + 1) % imageIndex.length;
        vi.spyOn(Math, 'random').mockReturnValue(i / imageIndex.length);

        expect(component.getRandomImageIndexNoRepeat()).toBe(component.imgBaseSlug + name);
        expect(component.prevIndex).toBe(i);
      });
    });

    it('getRandomImageIndexNoRepeat avoids picking the previous image', () => {
      const picks = new Set<string>();
      for (let i = 0; i < 100; i++) {
        const before = component.prevIndex;
        const src = component.getRandomImageIndexNoRepeat();
        if (src) {
          expect(component.prevIndex).not.toBe(before);
          picks.add(src);
        }
      }
      expect(picks.size).toBeGreaterThan(1);
    });

    it('getRandomImageIndexNoRepeat re-rolls instead of returning an empty string when it picks the previous image', () => {
      component.prevIndex = 0;
      const random = vi.spyOn(Math, 'random');
      random.mockReturnValueOnce(0).mockReturnValue(0.5); // first roll repeats index 0, so it must roll again

      const src = component.getRandomImageIndexNoRepeat();

      expect(src).toBe(component.imgBaseSlug + imageIndex[Math.floor(0.5 * imageIndex.length)]);
      expect(src).not.toBe('');
    });

    it('getRandomImageIndexNoRepeat never returns an empty string', () => {
      for (let i = 0; i < 500; i++) {
        expect(component.getRandomImageIndexNoRepeat()).not.toBe('');
      }
    });
  });

  describe('data', () => {
    it('has no duplicate filler paragraphs', () => {
      const values = fillerParagraphs.map(p => p.value);
      expect(new Set(values).size).toBe(values.length);
    });

    it('has unique image names', () => {
      expect(new Set(imageIndex).size).toBe(imageIndex.length);
    });
  });
});
