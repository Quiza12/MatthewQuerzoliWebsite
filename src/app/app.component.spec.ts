import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the header, the routed page outlet and the footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('app-header')).not.toBeNull();
    expect(el.querySelector('router-outlet')).not.toBeNull();
    expect(el.querySelector('app-footer')).not.toBeNull();
  });

  it('puts the header above the page and the footer below it', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const follows = (a: Element, b: Element) => !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

    expect(follows(el.querySelector('app-header')!, el.querySelector('router-outlet')!)).toBe(true);
    expect(follows(el.querySelector('router-outlet')!, el.querySelector('app-footer')!)).toBe(true);
  });
});
