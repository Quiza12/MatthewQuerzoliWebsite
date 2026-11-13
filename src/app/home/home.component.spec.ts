import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { pageTitleTest } from '../testing/page-chrome';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
    }).compileComponents();
  });

  function create(): ComponentFixture<HomeComponent> {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageTitleTest({ create: () => create(), title: 'Matthew Querzoli' });

  it('builds a mailto link with a friendly subject', () => {
    create();
    expect(component.emailHref).toBe('mailto:me@matthewquerzoli.com?Subject=Hey%21');
  });

  it('uses the mailto link for every contact link on the page', () => {
    create();
    const links = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]'));
    expect(links.length).toBeGreaterThan(0);
    links.forEach(l => expect(l.getAttribute('href')).toBe(component.emailHref));
  });

  it('greets the visitor', () => {
    create();
    expect((fixture.nativeElement as HTMLElement).querySelector('h2')!.textContent).toContain('Matthew Querzoli');
  });
});
