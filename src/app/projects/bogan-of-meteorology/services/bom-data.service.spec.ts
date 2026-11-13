import { TestBed } from '@angular/core/testing';

import { BomDataService } from './bom-data.service';
import { LocationForecast } from '../classes/location-forecast';

describe('BomDataService', () => {
  let service: BomDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BomDataService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const blank = () => new LocationForecast('Sydney', '', '', '', '', '', '', '', '', '', '', '');
  const named = (name: string) => new LocationForecast(name, '', '', '', '', '', '', '', '', '', '', '');

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBoganisedDay', () => {
    it.each([
      ['Monday', 'Mondee'],
      ['Tuesday', 'Tuesdee'],
      ['Wednesday', 'Wensdee'],
      ['Thursday', 'Thursdee'],
      ['Friday', 'Fridee'],
      ['Saturday', 'Satdee'],
      ['Sunday', 'Sundee'],
    ])('turns %s into %s', (day, bogan) => {
      expect(service.getBoganisedDay(day)).toBe(bogan);
    });

    it('passes unknown values through unchanged', () => {
      expect(service.getBoganisedDay('Funday')).toBe('Funday');
    });
  });

  describe('getPrettyDate', () => {
    it('writes the boganised weekday followed by the month and day', () => {
      const forecast = blank();
      service.getPrettyDate('2026-03-02T10:00:00', forecast); // a Monday
      expect(forecast.date).toBe('Mondee, March 2 ');
    });
  });

  describe('getAirTempAndPrecipRange', () => {
    it('picks out the min, max and precipitation range and ignores the rest', () => {
      const forecast = blank();

      service.getAirTempAndPrecipRange([
        { '@_type': 'forecast_icon_code', '#text': '3' },
        { '@_type': 'air_temperature_minimum', '#text': '12' },
        { '@_type': 'air_temperature_maximum', '#text': '27' },
        { '@_type': 'precipitation_range', '#text': '2 to 6 mm' },
      ], forecast);

      expect(forecast.airTempMin).toBe('12');
      expect(forecast.airTempMax).toBe('27');
      expect(forecast.precipRange).toBe('2 to 6 mm');
    });

    it('leaves fields blank when the data is missing', () => {
      const forecast = blank();
      service.getAirTempAndPrecipRange([{ '@_type': 'forecast_icon_code', '#text': '3' }], forecast);
      expect(forecast.airTempMin).toBe('');
      expect(forecast.airTempMax).toBe('');
      expect(forecast.precipRange).toBe('');
    });
  });

  describe('getPrecisAndPoP', () => {
    it('picks out the precis and the probability of precipitation', () => {
      const forecast = blank();

      service.getPrecisAndPoP([
        { '@_type': 'precis', '#text': 'Partly cloudy.' },
        { '@_type': 'probability_of_precipitation', '#text': '20%' },
        { '@_type': 'something_else', '#text': 'ignored' },
      ], forecast);

      expect(forecast.precis).toBe('Partly cloudy.');
      expect(forecast.pop).toBe('20%');
    });
  });

  describe('getLocationList', () => {
    it('returns the location names sorted, with duplicates removed', () => {
      const list = service.getLocationList([named('Perth'), named('Albany'), named('Perth'), named('Broome')]);
      expect(list).toEqual(['Albany', 'Broome', 'Perth']);
    });

    it('returns an empty list for no data', () => {
      expect(service.getLocationList([])).toEqual([]);
    });
  });

  describe('getForecastForLocation', () => {
    const data = [named('Perth'), named('Albany'), named('Perth')];

    it('returns only the forecasts for the chosen location', () => {
      const result = service.getForecastForLocation({ locationFormControl: 'Perth' }, data);
      expect(result.length).toBe(2);
      expect(result.every(f => f.locationName === 'Perth')).toBe(true);
    });

    it('returns an empty list when nothing matches', () => {
      expect(service.getForecastForLocation({ locationFormControl: 'Hobart' }, data)).toEqual([]);
    });

    it('starts afresh on each call', () => {
      service.getForecastForLocation({ locationFormControl: 'Perth' }, data);
      expect(service.getForecastForLocation({ locationFormControl: 'Albany' }, data).length).toBe(1);
    });
  });

  describe('getWeeksForecast', () => {
    const period = (start: string, min: string) => ({
      '@_start-time-local': start,
      element: [
        { '@_type': 'air_temperature_minimum', '#text': min },
        { '@_type': 'air_temperature_maximum', '#text': '30' },
      ],
      text: [
        { '@_type': 'precis', '#text': 'Sunny.' },
        { '@_type': 'probability_of_precipitation', '#text': '10%' },
      ],
    });

    it('adds one forecast per forecast period', () => {
      const results: LocationForecast[] = [];

      service.getWeeksForecast({
        '@_description': 'Sydney',
        'forecast-period': [period('2026-03-02T10:00:00', '10'), period('2026-03-03T00:00:00', '11'), period('2026-03-04T00:00:00', '12')],
      }, results);

      expect(results.length).toBe(3);
      expect(results.map(r => r.locationName)).toEqual(['Sydney', 'Sydney', 'Sydney']);
      expect(results.map(r => r.airTempMin)).toEqual(['10', '11', '12']);
      expect(results[0].precis).toBe('Sunny.');
      expect(results[0].pop).toBe('10%');
    });

    it('labels the first, partial day as the rest of the day', () => {
      const results: LocationForecast[] = [];

      service.getWeeksForecast({
        '@_description': 'Sydney',
        'forecast-period': [period('2026-03-02T10:00:00', '10'), period('2026-03-03T00:00:00', '11')],
      }, results);

      expect(results[0].date).toBe('Forecast for rest of Mondee');
      expect(results[1].date).toBe('Tuesdee, March 3 ');
    });

    it('copes with a location that has a single forecast period rather than an array', () => {
      const results: LocationForecast[] = [];

      service.getWeeksForecast({
        '@_description': 'Cairns',
        'forecast-period': period('2026-03-02T10:00:00', '22'),
      }, results);

      expect(results.length).toBe(1);
      expect(results[0].locationName).toBe('Cairns');
      expect(results[0].airTempMin).toBe('22');
    });
  });

  describe('loopResults', () => {
    it('skips the first two areas and any public-district areas', () => {
      const spy = vi.spyOn(service, 'getWeeksForecast').mockImplementation(() => {});
      const areas = [
        { type: '@_region' },
        { type: '@_metropolitan' },
        { type: '@_location', id: 'keep-1' },
        { type: '@_public-district' },
        { type: '@_location', id: 'keep-2' },
      ];

      service.loopResults({ product: { forecast: { area: areas } } }, []);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.mock.calls.map(c => (c[0] as { id: string }).id)).toEqual(['keep-1', 'keep-2']);
    });
  });

  describe('getBomData', () => {
    it('loads all seven states once and reuses the same promise afterwards', async () => {
      const load = vi.spyOn(service, 'retrieveDataFromAzure').mockResolvedValue(undefined);

      const first = service.getBomData();
      const second = service.getBomData();
      await first;

      expect(second).toBe(first);
      expect(load).toHaveBeenCalledTimes(7);
      const files = load.mock.calls.map(c => c[0]);
      expect(files).toEqual(['IDN11060.xml', 'IDD10207.xml', 'IDQ11295.xml', 'IDS10044.xml', 'IDT16710.xml', 'IDV10753.xml', 'IDW14199.xml']);
    });
  });

  describe('result accessors', () => {
    it('start empty for every state', () => {
      expect(service.getNswResultsForDisplay()).toEqual([]);
      expect(service.getNtResultsForDisplay()).toEqual([]);
      expect(service.getQldResultsForDisplay()).toEqual([]);
      expect(service.getSaResultsForDisplay()).toEqual([]);
      expect(service.getTasResultsForDisplay()).toEqual([]);
      expect(service.getVicResultsForDisplay()).toEqual([]);
      expect(service.getWaResultsForDisplay()).toEqual([]);
    });
  });
});
