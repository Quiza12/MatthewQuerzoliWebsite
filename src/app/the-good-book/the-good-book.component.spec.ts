import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheGoodBookComponent } from './the-good-book.component';
import { pageTitleTest } from '../testing/page-chrome';

describe('TheGoodBookComponent', () => {
  let component: TheGoodBookComponent;
  let fixture: ComponentFixture<TheGoodBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheGoodBookComponent],
    }).compileComponents();
  });

  function create(): ComponentFixture<TheGoodBookComponent> {
    fixture = TestBed.createComponent(TheGoodBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageTitleTest({ create: () => create(), title: 'The Good Book - Matthew Querzoli' });

  it('renders its content', () => {
    create();
    expect((fixture.nativeElement as HTMLElement).textContent!.trim().length).toBeGreaterThan(0);
  });
});
