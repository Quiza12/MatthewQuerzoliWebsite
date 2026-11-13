import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NanoNarrativesComponent } from './nano-narratives.component';
import { pageTitleTest } from '../testing/page-chrome';

describe('NanoNarrativesComponent', () => {
  let component: NanoNarrativesComponent;
  let fixture: ComponentFixture<NanoNarrativesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NanoNarrativesComponent],
    }).compileComponents();
  });

  afterEach(() => vi.useRealTimers());

  function createOn(date: Date): ComponentFixture<NanoNarrativesComponent> {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(date);
    fixture = TestBed.createComponent(NanoNarrativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    createOn(new Date(2026, 5, 15, 12));
    expect(component).toBeTruthy();
  });

  pageTitleTest({ create: () => createOn(new Date(2026, 5, 15, 12)), title: 'Nano Narratives - Matthew Querzoli' });

  it('formats today as dd/mm/yyyy', () => {
    createOn(new Date(2026, 2, 5, 12));
    expect(component.formattedDate).toBe('05/03/2026');
  });

  it('zero-pads single-digit days and months, and does not for double digits', () => {
    createOn(new Date(2026, 10, 23, 12));
    expect(component.formattedDate).toBe('23/11/2026');
  });

  it("links to today's image on GitHub using a ddmmyyyy file name", () => {
    createOn(new Date(2026, 2, 5, 12));
    expect(component.formattedImageDate).toBe('05032026');
    expect(component.baseLink).toBe('https://raw.githubusercontent.com/Quiza12/NanoNarratives/refs/heads/master/images/05032026.jpg');
  });

  it('shows the date and the image', () => {
    createOn(new Date(2026, 2, 5, 12));
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('h5')!.textContent).toBe('05/03/2026');
    const img = el.querySelector('img')!;
    expect(img.getAttribute('src')).toBe(component.baseLink);
    expect(img.getAttribute('alt')).toBe('Nano narrative for 05/03/2026');
  });
});
