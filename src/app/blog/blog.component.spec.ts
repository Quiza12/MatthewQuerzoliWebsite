import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { BlogComponent } from './blog.component';
import { pageTitleTest } from '../testing/page-chrome';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let http: HttpTestingController;
  let el: HTMLElement;

  const posts = [
    { title: 'First Post', slug: '01-01-2026-first-post', date: '01/01/2026' },
    { title: 'Second Post', slug: '02-02-2026-second-post', date: '02/02/2026' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  function create(): ComponentFixture<BlogComponent> {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
    return fixture;
  }

  const flushIndex = (body: unknown[]) => {
    http.expectOne('assets/blog/blog-index.json').flush(body);
    fixture.detectChanges();
  };

  it('should create', () => {
    create();
    http.expectOne('assets/blog/blog-index.json');
    expect(component).toBeTruthy();
  });

  pageTitleTest({
    create: () => {
      const f = create();
      http.expectOne('assets/blog/blog-index.json');
      return f;
    },
    title: 'Blog - Matthew Querzoli',
  });

  it('requests the blog index once', () => {
    create();
    const req = http.expectOne('assets/blog/blog-index.json');
    expect(req.request.method).toBe('GET');
  });

  it('starts with no posts and shows the empty message', () => {
    create();
    expect(component.blogPosts()).toEqual([]);
    expect(el.querySelector('li')!.textContent).toContain('There are no items.');
    http.expectOne('assets/blog/blog-index.json');
  });

  it('lists each post with its date once the index loads', () => {
    create();
    flushIndex(posts);

    const items = Array.from(el.querySelectorAll('li'));
    expect(component.blogPosts()).toEqual(posts);
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('First Post');
    expect(items[0].textContent).toContain('01/01/2026');
    expect(el.textContent).not.toContain('There are no items.');
  });

  it('links each post to its detail page by slug', () => {
    create();
    flushIndex(posts);

    const hrefs = Array.from(el.querySelectorAll('li a')).map(a => a.getAttribute('href'));
    expect(hrefs).toEqual(['/blog/01-01-2026-first-post', '/blog/02-02-2026-second-post']);
  });

  it('shows the empty message when the index has no posts', () => {
    create();
    flushIndex([]);
    expect(el.querySelector('li')!.textContent).toContain('There are no items.');
  });
});
