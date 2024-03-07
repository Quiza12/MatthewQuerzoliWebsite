import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheGoodBookComponent } from './the-good-book.component';

describe('TheGoodBookComponent', () => {
  let component: TheGoodBookComponent;
  let fixture: ComponentFixture<TheGoodBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TheGoodBookComponent]
    });
    fixture = TestBed.createComponent(TheGoodBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
