import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FashionFaves } from './fashion-faves';

describe('FashionFaves', () => {
  let component: FashionFaves;
  let fixture: ComponentFixture<FashionFaves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FashionFaves]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FashionFaves);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
