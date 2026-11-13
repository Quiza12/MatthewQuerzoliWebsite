import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionFaves } from './fashion-faves';
import { fashionFavesList } from './data/fashionFaves';
import { pageChromeTests } from '../../../testing/page-chrome';

describe('FashionFaves', () => {
  let component: FashionFaves;
  let fixture: ComponentFixture<FashionFaves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FashionFaves],
    }).compileComponents();
  });

  function create(): ComponentFixture<FashionFaves> {
    fixture = TestBed.createComponent(FashionFaves);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => create(),
    title: "Tap's Fashion Faves - Tappy OS - Projects",
    favicon: 'assets/images/favicons/fashion-faves-favicon.png',
  });

  it('loads every fashion fave, sorted by brand', () => {
    create();
    const brands = component.fashionFavesList.map(f => f.brand);

    expect(component.fashionFavesList.length).toBe(fashionFavesList.length);
    expect(brands).toEqual([...brands].sort((a, b) => a.localeCompare(b)));
  });

  it('shows the full list until a filter is applied', () => {
    create();
    expect(component.filteredFashionFavesList).toBe(component.fashionFavesList);
  });

  it('every fave has a brand name', () => {
    create();
    for (const fave of component.fashionFavesList) {
      expect(fave.brand).toBeTruthy();
    }
  });
});
