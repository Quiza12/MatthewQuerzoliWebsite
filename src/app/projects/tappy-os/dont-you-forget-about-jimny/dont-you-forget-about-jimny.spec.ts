import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DontYouForgetAboutJimny } from './dont-you-forget-about-jimny';

describe('DontYouForgetAboutJimny', () => {
  let component: DontYouForgetAboutJimny;
  let fixture: ComponentFixture<DontYouForgetAboutJimny>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DontYouForgetAboutJimny]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DontYouForgetAboutJimny);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
