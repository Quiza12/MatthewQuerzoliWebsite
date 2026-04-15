import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutOfOffice } from './out-of-office';

describe('OutOfOffice', () => {
  let component: OutOfOffice;
  let fixture: ComponentFixture<OutOfOffice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutOfOffice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutOfOffice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
