import { TestBed } from '@angular/core/testing';

import { BoganService } from './bogan.service';
import { ConstArrays } from './const-arrays.service';

describe('BoganService', () => {
  let service: BoganService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoganService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('word banks', () => {
    it('are populated for every temperature and chance-of-rain band', () => {
      const banks = [
        service.pop1, service.pop2, service.pop3, service.pop4, service.pop5,
        service.temp1, service.temp2, service.temp3, service.temp4, service.temp5, service.temp6, service.temp7,
      ];
      banks.forEach(bank => expect(bank.length).toBeGreaterThan(0));
    });

    it('has a precis translation map', () => {
      expect(service.precisMap.size).toBeGreaterThan(0);
      expect(service.precisMap.get('afternoon')).toBe('arvo');
    });
  });

  describe('getRandomChoice', () => {
    it('picks the element chosen by Math.random', () => {
      const random = vi.spyOn(Math, 'random');
      random.mockReturnValue(0);
      expect(service.getRandomChoice(['a', 'b', 'c'])).toBe('a');
      random.mockReturnValue(0.5);
      expect(service.getRandomChoice(['a', 'b', 'c'])).toBe('b');
      random.mockReturnValue(0.99);
      expect(service.getRandomChoice(['a', 'b', 'c'])).toBe('c');
    });
  });

  describe('boganiseAirTemp', () => {
    const cases: [string, number, () => string[]][] = [
      ['freezing (<= 0)', -5, () => service.temp1],
      ['freezing boundary (0)', 0, () => service.temp1],
      ['cold (1)', 1, () => service.temp2],
      ['cold boundary (7)', 7, () => service.temp2],
      ['chilly (8)', 8, () => service.temp3],
      ['chilly boundary (16)', 16, () => service.temp3],
      ['mild (17)', 17, () => service.temp4],
      ['mild boundary (23)', 23, () => service.temp4],
      ['warm (24)', 24, () => service.temp5],
      ['warm boundary (30)', 30, () => service.temp5],
      ['hot (31)', 31, () => service.temp6],
      ['hot boundary (38)', 38, () => service.temp6],
      ['scorching (39)', 39, () => service.temp7],
      ['scorching (50)', 50, () => service.temp7],
    ];

    it.each(cases)('%s picks from the matching word bank', (_label, temp, bank) => {
      expect(bank()).toContain(service.boganiseAirTemp(temp));
    });

    it('accepts temperatures given as strings, as the BoM data provides them', () => {
      expect(service.temp5).toContain(service.boganiseAirTemp('25'));
    });
  });

  describe('boganisePop', () => {
    const cases: [string, string, () => string[]][] = [
      ['0%', '0%', () => service.pop1],
      ['20%', '20%', () => service.pop1],
      ['30%', '30%', () => service.pop2],
      ['40%', '40%', () => service.pop2],
      ['50%', '50%', () => service.pop3],
      ['60%', '60%', () => service.pop3],
      ['70%', '70%', () => service.pop4],
      ['80%', '80%', () => service.pop4],
      ['90%', '90%', () => service.pop5],
      ['100%', '100%', () => service.pop5],
    ];

    it.each(cases)('%s picks from the matching word bank', (_label, pop, bank) => {
      expect(bank()).toContain(service.boganisePop(pop));
    });

    it('ignores the percent sign', () => {
      expect(service.pop2).toContain(service.boganisePop('30'));
    });

    it.each([
      ['21%', () => service.pop2],
      ['41%', () => service.pop3],
      ['61%', () => service.pop4],
      ['81%', () => service.pop5],
    ] as [string, () => string[]][])('%s (a band boundary) still picks from the next band', (pop, bank) => {
      expect(bank()).toContain(service.boganisePop(pop));
    });

    it('picks a word for every whole percentage from 0 to 100', () => {
      for (let n = 0; n <= 100; n++) {
        expect(service.boganisePop(`${n}%`), `${n}%`).toBeTruthy();
      }
    });
  });

  describe('boganisePrecis', () => {
    it('translates known words into bogan', () => {
      expect(service.boganisePrecis('Possible shower.')).toBe('Might be bitta rain.');
    });

    it('translates every matching word', () => {
      const result = service.boganisePrecis('Clear afternoon.');
      expect(result).toBe('Clear as glass arvo.');
    });

    it('capitalises the start of the sentence', () => {
      expect(service.boganisePrecis('Windy.')[0]).toBe('B'); // "bloody breezy"
    });

    it('is case-insensitive about the input', () => {
      expect(service.boganisePrecis('POSSIBLE SHOWER.')).toBe('Might be bitta rain.');
    });
  });

  describe('makeSentenceCase', () => {
    it('capitalises each sentence', () => {
      expect(service.makeSentenceCase('hello there. general kenobi.')).toBe('Hello there. General kenobi.');
    });

    it('handles a single sentence', () => {
      expect(service.makeSentenceCase('hello there.')).toBe('Hello there.');
    });

    it('drops text after the final full stop', () => {
      expect(service.makeSentenceCase('hello there. unfinished')).toBe('Hello there.');
    });

    it('returns an empty string when there is no full stop', () => {
      expect(service.makeSentenceCase('no full stop')).toBe('');
    });
  });

  describe('boganise', () => {
    function forecast(overrides: Record<string, string> = {}) {
      return {
        pop: '90%', airTempMin: '5', airTempMax: '40', precis: 'Possible shower.',
        boganisedPop: '', boganisedAirTempMin: '', boganisedAirTempMax: '', boganisedPrecis: '',
        ...overrides,
      };
    }

    it('fills in every boganised field for each forecast', () => {
      const list = [forecast(), forecast({ pop: '10%', airTempMax: '20' })];

      service.boganise(list);

      expect(service.pop5).toContain(list[0].boganisedPop);
      expect(service.temp2).toContain(list[0].boganisedAirTempMin);
      expect(service.temp7).toContain(list[0].boganisedAirTempMax);
      expect(list[0].boganisedPrecis).toBe('Might be bitta rain.');
      expect(service.pop1).toContain(list[1].boganisedPop);
      expect(service.temp4).toContain(list[1].boganisedAirTempMax);
    });

    it('returns the same list it was given', () => {
      const list = [forecast()];
      expect(service.boganise(list)).toBe(list);
    });

    it('copes with an empty list', () => {
      expect(service.boganise([])).toEqual([]);
    });
  });

  describe('ConstArrays', () => {
    it('creates independent copies of the word banks each time', () => {
      const a = new ConstArrays();
      const b = new ConstArrays();
      a.temp1.push('extra');
      expect(b.temp1).not.toContain('extra');
    });
  });
});
