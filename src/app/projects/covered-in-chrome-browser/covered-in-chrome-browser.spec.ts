import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoveredInChromeBrowser } from './covered-in-chrome-browser';

describe('CoveredInChromeBrowser', () => {
  let component: CoveredInChromeBrowser;
  let fixture: ComponentFixture<CoveredInChromeBrowser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoveredInChromeBrowser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoveredInChromeBrowser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
