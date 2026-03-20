import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageMafsEpisodeGraph } from './average-mafs-episode';

describe('AverageMafsEpisodeGraph', () => {
  let component: AverageMafsEpisodeGraph;
  let fixture: ComponentFixture<AverageMafsEpisodeGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageMafsEpisodeGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AverageMafsEpisodeGraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
