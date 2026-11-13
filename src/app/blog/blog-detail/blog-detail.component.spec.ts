import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';

import { BlogDetailComponent } from './blog-detail.component';

describe('BlogDetailComponent', () => {
  let component: BlogDetailComponent;
  let fixture: ComponentFixture<BlogDetailComponent>;
  let http: HttpTestingController;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ slug: 'my-post' }) } } },
      ],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  function create(): ComponentFixture<BlogDetailComponent> {
    fixture = TestBed.createComponent(BlogDetailComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
    return fixture;
  }

  function loadPost(markdown: string): HTMLElement {
    create();
    http.expectOne('assets/blog/posts/my-post.md').flush(markdown);
    fixture.detectChanges();
    return el.querySelector('.markdown-body')!;
  }

  it('should create', () => {
    create();
    http.expectOne('assets/blog/posts/my-post.md');
    expect(component).toBeTruthy();
  });

  it('requests the markdown file for the slug in the route, as text', () => {
    create();
    const req = http.expectOne('assets/blog/posts/my-post.md');
    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toBe('text');
  });

  it('shows nothing until the post arrives', () => {
    create();
    expect(el.querySelector('.markdown-body')!.innerHTML).toBe('');
    http.expectOne('assets/blog/posts/my-post.md');
  });

  it('renders markdown as HTML', () => {
    const body = loadPost('# Heading\n\nSome **bold** text.');

    expect(body.querySelector('h1')!.textContent).toBe('Heading');
    expect(body.querySelector('strong')!.textContent).toBe('bold');
  });

  it('renders single line breaks as <br> (GFM breaks)', () => {
    const body = loadPost('line one\nline two');
    expect(body.querySelector('br')).not.toBeNull();
  });

  it('renders list items', () => {
    const body = loadPost('- one\n- two\n- three');
    expect(Array.from(body.querySelectorAll('li')).map(li => li.textContent!.trim())).toEqual(['one', 'two', 'three']);
  });

  it('applies inline markdown inside list items', () => {
    const body = loadPost('- some *emphasis* here');
    expect(body.querySelector('li em')!.textContent).toBe('emphasis');
  });

  it('renders task lists as interactive checkboxes, checked where ticked', () => {
    const body = loadPost('- [x] done\n- [ ] todo');

    const boxes = Array.from(body.querySelectorAll<HTMLInputElement>('li.task-list-item input[type="checkbox"]'));
    expect(boxes.length).toBe(2);
    expect(boxes[0].checked).toBe(true);
    expect(boxes[1].checked).toBe(false);
    expect(body.querySelector('li.task-list-item span')!.textContent).toContain('done');
  });

  it('renders links', () => {
    const body = loadPost('[a link](https://example.com)');
    expect(body.querySelector('a')!.getAttribute('href')).toBe('https://example.com');
  });
});
