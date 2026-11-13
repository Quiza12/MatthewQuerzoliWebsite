import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrkinismsComponent } from './orkinisms.component';
import { orkinisms } from './data/orkinisms';
import { pageChromeTests } from '../../../testing/page-chrome';

describe('OrkinismsComponent', () => {
  let component: OrkinismsComponent;
  let fixture: ComponentFixture<OrkinismsComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrkinismsComponent],
    }).compileComponents();
  });

  function create(): ComponentFixture<OrkinismsComponent> {
    fixture = TestBed.createComponent(OrkinismsComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
    return fixture;
  }

  const entries = () => Array.from(el.querySelectorAll('.results p'));

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => create(),
    title: 'Orkinisms - Tappy OS - Projects',
    favicon: 'assets/images/favicons/orkinisms-favicon.png',
  });

  it('lists every orkinism, sorted by word', () => {
    create();
    const words = component.orkinismList.map(o => o.word);

    expect(component.orkinismList.length).toBe(orkinisms.length);
    expect(words).toEqual([...words].sort((a, b) => a.localeCompare(b)));
    expect(entries().length).toBe(orkinisms.length);
  });

  describe('filterResults', () => {
    it('filters to the entries whose word contains the text', () => {
      create();
      const target = component.orkinismList[0].word.slice(0, 4);
      const expected = orkinisms.filter(o => o.word.includes(target.toLowerCase()));

      component.filterResults(target);

      expect(component.filteredOrkinismList.length).toBe(expected.length);
      expect(component.filteredOrkinismList.every(o => o.word.includes(target.toLowerCase()))).toBe(true);
    });

    it('matches case-insensitively on the search text', () => {
      create();
      const target = component.orkinismList[0].word.slice(0, 4);

      component.filterResults(target.toUpperCase());
      const upper = component.filteredOrkinismList.length;
      component.filterResults(target.toLowerCase());

      expect(upper).toBeGreaterThan(0);
      expect(component.filteredOrkinismList.length).toBe(upper);
    });

    it('returns nothing when no word matches', () => {
      create();
      component.filterResults('zzzzzzzzzz-no-such-word');
      expect(component.filteredOrkinismList).toEqual([]);
    });

    it('restores the full list when the text is cleared', () => {
      create();
      component.filterResults('zzzzzzzzzz-no-such-word');
      component.filterResults('');
      expect(component.filteredOrkinismList).toBe(component.orkinismList);
    });

    it('filters from the search box as the user types', () => {
      create();
      const input = el.querySelector<HTMLInputElement>('input')!;

      input.value = 'zzzzzzzzzz-no-such-word';
      input.dispatchEvent(new KeyboardEvent('keyup'));
      fixture.detectChanges();
      expect(entries().length).toBe(0);

      input.value = '';
      input.dispatchEvent(new KeyboardEvent('keyup'));
      fixture.detectChanges();
      expect(entries().length).toBe(orkinisms.length);
    });
  });
});
