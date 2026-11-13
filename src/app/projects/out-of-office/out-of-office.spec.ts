import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { OutOfOffice } from './out-of-office';
import { pageChromeTests } from '../../testing/page-chrome';

describe('OutOfOffice', () => {
  let component: OutOfOffice;
  let fixture: ComponentFixture<OutOfOffice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutOfOffice],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  function create(): ComponentFixture<OutOfOffice> {
    fixture = TestBed.createComponent(OutOfOffice);
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
    title: 'Out of Office//Pass the Parcel - Projects',
    favicon: 'assets/images/favicons/out-of-office-favicon.png',
  });

  it('links to the projects page and to the about page', () => {
    create();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('a[href="/projects"]')).not.toBeNull();
    expect(el.querySelector('a[href="/projects/out-of-office/about"]')).not.toBeNull();
  });
});
