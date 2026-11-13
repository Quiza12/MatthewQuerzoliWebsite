import { TestBed } from '@angular/core/testing';

import { StrengthsService } from './strengths.service';

describe('StrengthsService', () => {
  let service: StrengthsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrengthsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('strength reasons', () => {
    it('has reasons', () => {
      expect(service.strengthReasons.length).toBeGreaterThan(0);
    });

    it('gives every reason text, an answer and a unique tag', () => {
      const tags = service.strengthReasons.map(r => r.tag);
      expect(new Set(tags).size).toBe(tags.length);
      service.strengthReasons.forEach(r => {
        expect(r.reason, r.tag).toBeTruthy();
        expect(r.answer, r.tag).toBeTruthy();
        expect(typeof r.hidden, r.tag).toBe('boolean');
      });
    });

    it('includes the basic length, number and case rules', () => {
      const tags = service.strengthReasons.map(r => r.tag);
      for (const tag of ['length', 'numerics', 'specialChars', 'uppercase', 'lowercase']) {
        expect(tags).toContain(tag);
      }
    });
  });

  describe('temp reasons', () => {
    it('starts empty', () => {
      expect(service.tempReasons).toEqual([]);
      expect(service.getTempListLength()).toBe(0);
    });

    it('addToTempArray adds a reason', () => {
      service.addToTempArray('too short');
      service.addToTempArray('no numbers');
      expect(service.tempReasons).toEqual(['too short', 'no numbers']);
      expect(service.getTempListLength()).toBe(2);
    });

    it('clearTempArray empties the list', () => {
      service.addToTempArray('too short');
      service.clearTempArray();
      expect(service.tempReasons).toEqual([]);
      expect(service.getTempListLength()).toBe(0);
    });
  });

  describe('hidden counts', () => {
    it('setCountsToZero resets both counts', () => {
      service.setCountsToZero();
      expect(service.getHiddenTrueCount()).toBe(0);
      expect(service.getHiddenFalseCount()).toBe(0);
    });

    it('determineHiddenCount splits the reasons into hidden and visible', () => {
      service.setCountsToZero();

      service.determineHiddenCount();

      const hidden = service.strengthReasons.filter(r => r.hidden).length;
      const visible = service.strengthReasons.filter(r => !r.hidden).length;
      expect(service.getHiddenTrueCount()).toBe(hidden);
      expect(service.getHiddenFalseCount()).toBe(visible);
      expect(hidden + visible).toBe(service.strengthReasons.length);
    });

    it('has both hidden and visible reasons', () => {
      expect(service.strengthReasons.some(r => r.hidden)).toBe(true);
      expect(service.strengthReasons.some(r => !r.hidden)).toBe(true);
    });
  });
});
