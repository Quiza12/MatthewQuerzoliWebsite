import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { OooAbout } from './ooo-about';

describe('OooAbout', () => {
  let component: OooAbout;
  let fixture: ComponentFixture<OooAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OooAbout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(OooAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets the page title', () => {
    expect(TestBed.inject(Title).getTitle()).toBe('🏢 Out of Office//Pass the Parcel - Projects');
  });
});
