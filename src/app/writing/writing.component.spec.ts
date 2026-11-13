import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingComponent } from './writing.component';
import { pageTitleTest } from '../testing/page-chrome';

describe('WritingComponent', () => {
  let component: WritingComponent;
  let fixture: ComponentFixture<WritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingComponent],
    }).compileComponents();
  });

  function create(): ComponentFixture<WritingComponent> {
    fixture = TestBed.createComponent(WritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageTitleTest({ create: () => create(), title: 'Writing - Matthew Querzoli' });

  it('renders its content', () => {
    create();
    expect((fixture.nativeElement as HTMLElement).textContent!.trim().length).toBeGreaterThan(0);
  });
});
