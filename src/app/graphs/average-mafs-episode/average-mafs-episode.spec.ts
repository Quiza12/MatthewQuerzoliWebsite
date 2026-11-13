import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageMafsEpisodeGraph } from './average-mafs-episode';

describe('AverageMafsEpisodeGraph', () => {
  let component: AverageMafsEpisodeGraph;
  let fixture: ComponentFixture<AverageMafsEpisodeGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageMafsEpisodeGraph],
    }).compileComponents();

    fixture = TestBed.createComponent(AverageMafsEpisodeGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a legend', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h4')!.textContent).toBe('Legend');
    expect(el.querySelectorAll('.legend-segment').length).toBeGreaterThan(0);
  });
});
