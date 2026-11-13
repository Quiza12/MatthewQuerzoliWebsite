import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

const ICON_SELECTOR = "link[rel~='icon']";

export function removeFavicons(): void {
  document.head.querySelectorAll(ICON_SELECTOR).forEach(l => l.remove());
}

export function currentFavicon(): HTMLLinkElement | null {
  return document.querySelector<HTMLLinkElement>(ICON_SELECTOR);
}

/**
 * Registers the tests shared by every project page: it sets the page title,
 * swaps in its own favicon, and puts the previous favicon back on destroy.
 * Call inside a describe() that has already configured TestBed.
 */
export function pageChromeTests(config: {
  create: () => ComponentFixture<unknown>;
  title: string;
  favicon: string;
}): void {
  describe('page title and favicon', () => {
    beforeEach(() => removeFavicons());

    it('sets the page title', () => {
      config.create();
      expect(TestBed.inject(Title).getTitle()).toBe(config.title);
    });

    it('sets its own favicon', () => {
      config.create();
      expect(currentFavicon()!.getAttribute('href')).toBe(config.favicon);
    });

    it('restores a previous png favicon on destroy', () => {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.setAttribute('href', 'other.png');
      document.head.appendChild(link);

      config.create().destroy();

      expect(link.getAttribute('href')).toBe('other.png');
      expect(link.type).toBe('image/png');
    });

    it('restores a previous .ico favicon on destroy', () => {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.setAttribute('href', 'favicon.ico');
      document.head.appendChild(link);

      config.create().destroy();

      expect(link.getAttribute('href')).toBe('favicon.ico');
      expect(link.type).toBe('image/x-icon');
    });

    it('leaves its favicon in place on destroy when there was none before', () => {
      config.create().destroy();
      expect(currentFavicon()!.getAttribute('href')).toBe(config.favicon);
    });
  });
}

/** For pages that only set a title (no favicon): registers a single "sets the page title" test. */
export function pageTitleTest(config: { create: () => ComponentFixture<unknown>; title: string }): void {
  it('sets the page title', () => {
    config.create();
    expect(TestBed.inject(Title).getTitle()).toBe(config.title);
  });
}
