import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OooAbout } from './ooo-about';

describe('OooAbout', () => {
  let component: OooAbout;
  let fixture: ComponentFixture<OooAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OooAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OooAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
