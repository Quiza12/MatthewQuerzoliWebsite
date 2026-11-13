import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Graphs } from './graphs';

describe('Graphs', () => {
  let component: Graphs;
  let fixture: ComponentFixture<Graphs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Graphs],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Graphs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to each graph', () => {
    const hrefs = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('a')).map(a => a.getAttribute('href'));
    expect(hrefs).toEqual(['/graphs/rage-against-the-lanyard', '/graphs/average-mafs-episode']);
  });
});
