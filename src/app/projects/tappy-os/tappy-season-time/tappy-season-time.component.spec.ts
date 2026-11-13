import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TappySeasonTimeComponent } from './tappy-season-time.component';
import { pageChromeTests } from '../../../testing/page-chrome';

describe('TappySeasonTimeComponent', () => {
  let component: TappySeasonTimeComponent;
  let fixture: ComponentFixture<TappySeasonTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TappySeasonTimeComponent],
    }).compileComponents();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /** The season boundaries are built from "now" when the component is constructed, so pin the clock first. */
  function createOn(isoDate: string): ComponentFixture<TappySeasonTimeComponent> {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(isoDate));
    fixture = TestBed.createComponent(TappySeasonTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    createOn('2026-06-15T12:00:00');
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => createOn('2026-06-15T12:00:00'),
    title: 'Tappy Season Time - Tappy OS - Projects',
    favicon: 'assets/images/favicons/tappy-season-time-favicon.png',
  });

  describe('determineSeason', () => {
    it('is summer from 25 January up to 14 February', () => {
      createOn('2026-01-25T12:00:00');
      expect(component.isSummer).toBe(true);
      expect(component.isWinter).toBe(false);
      expect(component.isSpring).toBe(false);
      expect(component.backgroundColour).toBe(component.summerColour);

      createOn('2026-02-14T12:00:00');
      expect(component.isSummer).toBe(true);
    });

    it('is winter from 15 February through to the end of the year', () => {
      for (const date of ['2026-02-15T12:00:00', '2026-06-15T12:00:00', '2026-12-31T12:00:00']) {
        createOn(date);
        expect(component.isWinter).toBe(true);
        expect(component.isSummer).toBe(false);
        expect(component.isSpring).toBe(false);
        expect(component.backgroundColour).toBe(component.winterColour);
      }
    });

    it('is still winter from 1 to 6 January, before spring starts', () => {
      for (const date of ['2026-01-01T12:00:00', '2026-01-06T23:59:00']) {
        createOn(date);
        expect(component.isWinter).toBe(true);
        expect(component.isSpring).toBe(false);
      }
    });

    it('is spring from 7 January up to 24 January', () => {
      for (const date of ['2026-01-07T00:00:00', '2026-01-15T12:00:00', '2026-01-24T23:59:00']) {
        createOn(date);
        expect(component.isSpring).toBe(true);
        expect(component.isWinter).toBe(false);
        expect(component.isSummer).toBe(false);
        expect(component.backgroundColour).toBe(component.springColour);
      }
    });

    it('always lands in exactly one season, every day of the year', () => {
      for (let day = 0; day < 366; day++) {
        const date = new Date(2026, 0, 1 + day, 12);
        if (date.getFullYear() !== 2026) break;
        createOn(date.toISOString());
        const seasons = [component.isSpring, component.isSummer, component.isWinter].filter(Boolean);
        expect(seasons.length, date.toDateString()).toBe(1);
      }
    });
  });

  describe('formattedSeasonRangeString', () => {
    it('ends the range the day before the next season starts', () => {
      createOn('2026-06-15T12:00:00');
      const formatted = component.formattedSeasonRangeString(new Date(2026, 0, 25), new Date(2026, 1, 15));
      const fmt = (d: Date) => d.toLocaleDateString(undefined, component.dayMonthOptions);

      expect(formatted).toBe(`${fmt(new Date(2026, 0, 25))} to ${fmt(new Date(2026, 1, 14))}`);
    });

    it('does not mutate the end date it was given', () => {
      createOn('2026-06-15T12:00:00');
      const end = new Date(2026, 1, 15);
      component.formattedSeasonRangeString(new Date(2026, 0, 25), end);
      expect(end.getDate()).toBe(15);
    });
  });

  it('lists all three season ranges on the page', () => {
    createOn('2026-06-15T12:00:00');
    const text = (fixture.nativeElement as HTMLElement).textContent!;
    expect(text).toContain('Summer:');
    expect(text).toContain('Winter:');
    expect(text).toContain('Spring:');
  });
});
