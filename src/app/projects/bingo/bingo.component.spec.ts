import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoComponent } from './bingo.component';

describe('BingoComponent', () => {
  let component: BingoComponent;
  let fixture: ComponentFixture<BingoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BingoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BingoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function selectCard(value: string) {
    const select: HTMLSelectElement = fixture.nativeElement.querySelector('#cards');
    select.value = value;
    select.dispatchEvent(new Event('change'));
  }

  describe('onCardChange', () => {
    it('should load the newborn tiles and mark the newborn card selected', () => {
      selectCard('Pregnant/newborn');

      expect(component.newbornCardSelected).toBeTrue();
      expect(component.tiles).toBe(component.newbornTiles);
      expect(component.bingoTileSize).toBe(component.newbornTiles.length);
    });

    it('should load the footy spectator tiles', () => {
      selectCard('Footy (spectator)');

      expect(component.footySpectatorCardSelected).toBeTrue();
      expect(component.tiles).toBe(component.footySpectatorTiles);
    });

    it('should load the footy player tiles', () => {
      selectCard('Footy (player)');

      expect(component.footyPlayerCardSelected).toBeTrue();
      expect(component.tiles).toBe(component.footyPlayerTiles);
    });

    it('should load the tysie tiles', () => {
      selectCard('Tysie');

      expect(component.tysieCardSelected).toBeTrue();
      expect(component.tiles).toBe(component.tysieTiles);
    });

    it('should load the office tiles', () => {
      selectCard('Office');

      expect(component.officeCardSelected).toBeTrue();
      expect(component.tiles).toBe(component.officeTiles);
    });

    it('should load the harro tiles', () => {
      selectCard('Harro');

      expect(component.harroCardSelected).toBeTrue();
      expect(component.tiles).toBe(component.harroTiles);
    });

    it('should load the market tiles', () => {
      selectCard('Average Sydney market');

      expect(component.marketCardSelected).toBeTrue();
      expect(component.tiles).toBe(component.marketTiles);
    });

    it('should clear all card selections when the placeholder is chosen', () => {
      selectCard('Harro');
      selectCard('Select a card...');

      expect(component.isCardSelected()).toBeFalse();
      expect(component.harroCardSelected).toBeFalse();
    });

    it('should reset selected tiles and win state when a new card is loaded', () => {
      selectCard('Harro');
      component.toggle(0);
      component.win = true;

      selectCard('Tysie');

      expect(component.selected.size).toBe(0);
      expect(component.win).toBeFalse();
    });
  });

  describe('isCardSelected', () => {
    it('should be false before any card is chosen', () => {
      expect(component.isCardSelected()).toBeFalse();
    });

    it('should be true once a card is chosen', () => {
      selectCard('Office');

      expect(component.isCardSelected()).toBeTrue();
    });
  });

  describe('toggle / isSelected', () => {
    beforeEach(() => {
      selectCard('Harro');
    });

    it('should select an unselected tile', () => {
      component.toggle(2);

      expect(component.isSelected(2)).toBeTrue();
    });

    it('should deselect an already selected tile', () => {
      component.toggle(2);
      component.toggle(2);

      expect(component.isSelected(2)).toBeFalse();
    });

    it('should not report win while tiles remain unselected', () => {
      component.toggle(0);

      expect(component.win).toBeFalse();
    });

    it('should report win once every tile is selected', () => {
      for (let i = 0; i < component.harroTiles.length; i++) {
        component.toggle(i);
      }

      expect(component.win).toBeTrue();
    });
  });

  describe('replay', () => {
    it('should clear selected tiles and win state', () => {
      selectCard('Harro');
      for (let i = 0; i < component.harroTiles.length; i++) {
        component.toggle(i);
      }
      expect(component.win).toBeTrue();

      component.replay();

      expect(component.selected.size).toBe(0);
      expect(component.win).toBeFalse();
    });
  });
});
