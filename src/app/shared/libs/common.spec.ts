import { getRandomEntry, setFavicon, sortObjectArray } from './common';
import { currentFavicon, removeFavicons } from '../../testing/page-chrome';

describe('common helpers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getRandomEntry', () => {
    it('returns the entry picked by Math.random', () => {
      const random = vi.spyOn(Math, 'random');
      const items = ['a', 'b', 'c', 'd'];

      random.mockReturnValue(0);
      expect(getRandomEntry(items)).toBe('a');
      random.mockReturnValue(0.5);
      expect(getRandomEntry(items)).toBe('c');
      random.mockReturnValue(0.999);
      expect(getRandomEntry(items)).toBe('d');
    });

    it('always returns a member of the array', () => {
      const items = [1, 2, 3];
      for (let i = 0; i < 50; i++) {
        expect(items).toContain(getRandomEntry(items));
      }
    });

    it('returns undefined for an empty array', () => {
      expect(getRandomEntry([])).toBeUndefined();
    });
  });

  describe('sortObjectArray', () => {
    it('sorts by a string field alphabetically', () => {
      const result = sortObjectArray([{ n: 'pear' }, { n: 'apple' }, { n: 'mango' }], 'n');
      expect(result.map(r => r.n)).toEqual(['apple', 'mango', 'pear']);
    });

    it('sorts by a number field numerically rather than as text', () => {
      const result = sortObjectArray([{ n: 10 }, { n: 9 }, { n: 100 }], 'n');
      expect(result.map(r => r.n)).toEqual([9, 10, 100]);
    });

    it('compares strings with localeCompare', () => {
      const result = sortObjectArray([{ n: 'b' }, { n: 'A' }, { n: 'a' }], 'n');
      expect(result.map(r => r.n)).toEqual(['a', 'A', 'b']);
    });

    it('leaves items in place when the field is not a string or number', () => {
      const items = [{ n: true }, { n: false }];
      expect(sortObjectArray(items, 'n').map(r => r.n)).toEqual([true, false]);
    });

    it('sorts in place and returns the same array', () => {
      const items = [{ n: 2 }, { n: 1 }];
      expect(sortObjectArray(items, 'n')).toBe(items);
      expect(items[0].n).toBe(1);
    });

    it('handles an empty array', () => {
      expect(sortObjectArray([] as { n: number }[], 'n')).toEqual([]);
    });
  });

  describe('setFavicon', () => {
    beforeEach(() => removeFavicons());
    afterEach(() => removeFavicons());

    it('creates the icon link when there is none, and returns null as the previous value', () => {
      const previous = setFavicon('new.png');

      expect(previous).toBeNull();
      const link = currentFavicon()!;
      expect(link.getAttribute('href')).toBe('new.png');
      expect(link.parentElement).toBe(document.head);
    });

    it('defaults the type to image/png', () => {
      setFavicon('new.png');
      expect(currentFavicon()!.type).toBe('image/png');
    });

    it('uses the type it is given', () => {
      setFavicon('new.ico', 'image/x-icon');
      expect(currentFavicon()!.type).toBe('image/x-icon');
    });

    it('updates an existing icon link rather than adding another, and returns what it replaced', () => {
      const existing = document.createElement('link');
      existing.rel = 'icon';
      existing.setAttribute('href', 'old.png');
      document.head.appendChild(existing);

      const previous = setFavicon('new.png');

      expect(previous).toBe('old.png');
      expect(document.head.querySelectorAll("link[rel~='icon']").length).toBe(1);
      expect(existing.getAttribute('href')).toBe('new.png');
    });

    it('can be used to put the previous icon back', () => {
      const existing = document.createElement('link');
      existing.rel = 'icon';
      existing.setAttribute('href', 'old.png');
      document.head.appendChild(existing);

      const previous = setFavicon('new.png');
      setFavicon(previous!);

      expect(existing.getAttribute('href')).toBe('old.png');
    });

    it('also matches rel="shortcut icon"', () => {
      const existing = document.createElement('link');
      existing.rel = 'shortcut icon';
      existing.setAttribute('href', 'old.png');
      document.head.appendChild(existing);

      setFavicon('new.png');

      expect(document.head.querySelectorAll("link[rel~='icon']").length).toBe(1);
      expect(existing.getAttribute('href')).toBe('new.png');
    });
  });
});
