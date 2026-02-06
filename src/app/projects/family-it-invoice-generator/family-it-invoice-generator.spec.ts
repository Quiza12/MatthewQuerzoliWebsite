import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyItInvoiceGenerator } from './family-it-invoice-generator';

describe('FamilyItInvoiceGenerator', () => {
  let component: FamilyItInvoiceGenerator;
  let fixture: ComponentFixture<FamilyItInvoiceGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyItInvoiceGenerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamilyItInvoiceGenerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
