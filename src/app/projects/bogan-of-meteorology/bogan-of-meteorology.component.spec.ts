import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoganOfMeteorologyComponent } from './bogan-of-meteorology.component';
import { BomDataService } from './services/bom-data.service';
import { BoganService } from './services/bogan.service';
import { LocationForecast } from './classes/location-forecast';
import { pageChromeTests } from '../../testing/page-chrome';

const STATES = ['nsw', 'qld', 'nt', 'sa', 'tas', 'wa', 'vic'] as const;
type State = typeof STATES[number];

describe('BoganOfMeteorologyComponent', () => {
  let component: BoganOfMeteorologyComponent;
  let fixture: ComponentFixture<BoganOfMeteorologyComponent>;
  let el: HTMLElement;
  let resolveData: () => void;

  // One recognisable result array and location list per state.
  const results = Object.fromEntries(STATES.map(s => [s, [{ locationName: `${s}-town` } as LocationForecast]])) as Record<State, LocationForecast[]>;

  let bomData: {
    getBomData: ReturnType<typeof vi.fn>;
    getLocationList: ReturnType<typeof vi.fn>;
    getForecastForLocation: ReturnType<typeof vi.fn>;
  } & Record<string, ReturnType<typeof vi.fn>>;
  let bogan: { boganise: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    // Never hit Azure: the data load is a promise the test resolves when it wants.
    const loaded = new Promise<void>(resolve => (resolveData = resolve));

    bomData = {
      getBomData: vi.fn().mockReturnValue(loaded),
      getLocationList: vi.fn((state: LocationForecast[]) => state.map(f => f.locationName)),
      getForecastForLocation: vi.fn((_chosen: unknown, state: LocationForecast[]) => state),
      getNswResultsForDisplay: vi.fn(() => results.nsw),
      getQldResultsForDisplay: vi.fn(() => results.qld),
      getNtResultsForDisplay: vi.fn(() => results.nt),
      getSaResultsForDisplay: vi.fn(() => results.sa),
      getTasResultsForDisplay: vi.fn(() => results.tas),
      getWaResultsForDisplay: vi.fn(() => results.wa),
      getVicResultsForDisplay: vi.fn(() => results.vic),
    };
    bogan = { boganise: vi.fn((list: LocationForecast[]) => list) };

    await TestBed.configureTestingModule({
      imports: [BoganOfMeteorologyComponent],
      providers: [
        { provide: BomDataService, useValue: bomData },
        { provide: BoganService, useValue: bogan },
      ],
    }).compileComponents();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  function create(): ComponentFixture<BoganOfMeteorologyComponent> {
    fixture = TestBed.createComponent(BoganOfMeteorologyComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
    return fixture;
  }

  async function createLoaded(): Promise<void> {
    create();
    resolveData();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => create(),
    title: 'Bogan of Meteorology - Projects',
    favicon: 'assets/images/favicons/bogan-of-meteorology-favicon.png',
  });

  describe('loading', () => {
    it('shows the spinner and hides state selection while the data loads', () => {
      create();
      expect(bomData.getBomData).toHaveBeenCalledTimes(1);
      expect(component.loadingSpinner).toBe(true);
      expect(component.displayStateSelection).toBe(false);
      expect(el.querySelector('.spinner-border')).not.toBeNull();
      expect(el.querySelector('input[type="radio"]')).toBeNull();
    });

    it('shows the state picker once the data has loaded', async () => {
      await createLoaded();

      expect(component.loadingSpinner).toBe(false);
      expect(component.displayStateSelection).toBe(true);
      expect(el.querySelector('.spinner-border')).toBeNull();
      expect(el.querySelectorAll('input[type="radio"]').length).toBe(7);
    });

    it('does not show a location list or forecast before a state is chosen', async () => {
      await createLoaded();
      expect(component.displayLocationList).toBe(false);
      expect(component.displayDailyForecast).toBe(false);
    });
  });

  describe('stateOptionChange', () => {
    beforeEach(async () => createLoaded());

    it.each(STATES)('%s loads that state\'s locations', state => {
      component.stateOption = state;

      component.stateOptionChange();

      expect(component.chosenLocationList).toEqual([`${state}-town`]);
      expect(component.displayLocationList).toBe(true);
    });

    it('hides any forecast already on screen', () => {
      component.displayDailyForecast = true;
      component.stateOption = 'wa';

      component.stateOptionChange();

      expect(component.displayDailyForecast).toBe(false);
    });

    it('refreshes every state location list', () => {
      component.stateOption = 'nsw';
      component.stateOptionChange();

      expect(component.nswLocationList).toEqual(['nsw-town']);
      expect(component.qldLocationList).toEqual(['qld-town']);
      expect(component.ntLocationList).toEqual(['nt-town']);
      expect(component.saLocationList).toEqual(['sa-town']);
      expect(component.tasLocationList).toEqual(['tas-town']);
      expect(component.waLocationList).toEqual(['wa-town']);
      expect(component.vicLocationList).toEqual(['vic-town']);
    });

    it('resets the location form to nothing selected', () => {
      component.locationSelectionForm.get('locationFormControl')!.setValue('old');
      component.stateOption = 'sa';

      component.stateOptionChange();

      expect(component.locationSelectionForm.get('locationFormControl')!.value).toBeNull();
    });

    it('is triggered by picking a radio button', () => {
      const radio = el.querySelector<HTMLInputElement>('#vic')!;

      radio.click();
      radio.dispatchEvent(new Event('change', { bubbles: true }));
      fixture.detectChanges();

      expect(component.stateOption).toBe('vic');
      expect(component.chosenLocationList).toEqual(['vic-town']);
      expect(el.querySelector('select')).not.toBeNull();
    });
  });

  describe('loadSevenDayForecast', () => {
    beforeEach(async () => createLoaded());

    it.each(STATES)('looks up the %s forecast for the chosen location and boganises it', state => {
      component.stateOption = state;
      component.chosenLocation = { locationFormControl: `${state}-town` };

      component.loadSevenDayForecast();

      expect(bomData.getForecastForLocation).toHaveBeenCalledWith(component.chosenLocation, results[state]);
      expect(bogan.boganise).toHaveBeenCalledWith(results[state]);
      expect(component.resultsArray).toBe(results[state]);
      expect(component.displayDailyForecast).toBe(true);
    });

    it('is triggered when a location is picked', () => {
      component.stateOption = 'nt';
      component.stateOptionChange();

      component.locationSelectionForm.get('locationFormControl')!.setValue('nt-town');

      expect(component.chosenLocation).toEqual({ locationFormControl: 'nt-town' });
      expect(component.displayDailyForecast).toBe(true);
      expect(component.resultsArray).toBe(results.nt);
    });

    it('renders a forecast entry for each result', () => {
      const forecast = new LocationForecast('Darwin', 'Mondee', 'Sunny.', 'Sunny, bloody oath', '10%', 'Nah', '24', 'Mild', '33', 'Hot', '', '');
      bogan.boganise.mockReturnValue([forecast, forecast]);
      component.stateOption = 'nt';
      component.chosenLocation = { locationFormControl: 'Darwin' };

      component.loadSevenDayForecast();
      fixture.detectChanges();

      expect(el.querySelectorAll('ul').length).toBe(2);
    });
  });

  it('boganise delegates to the bogan service', () => {
    create();
    const list = [{} as LocationForecast];
    expect(component.boganise(list)).toBe(list);
    expect(bogan.boganise).toHaveBeenCalledWith(list);
  });
});
