import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyItInvoiceGenerator } from './family-it-invoice-generator';
import { pageChromeTests } from '../../testing/page-chrome';

describe('FamilyItInvoiceGenerator', () => {
  let component: FamilyItInvoiceGenerator;
  let fixture: ComponentFixture<FamilyItInvoiceGenerator>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamilyItInvoiceGenerator],
    }).compileComponents();
  });

  function create(): ComponentFixture<FamilyItInvoiceGenerator> {
    fixture = TestBed.createComponent(FamilyItInvoiceGenerator);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    fixture.detectChanges();
    return fixture;
  }

  function fillValidForm(): void {
    component.invoiceForm.patchValue({ payeeName: 'Me', payerName: 'Uncle Bob' });
    component.lineItems.at(0).patchValue({ description: 'Fixed the wifi', quantity: '2', cost: '50' });
  }

  it('should create', () => {
    create();
    expect(component).toBeTruthy();
  });

  pageChromeTests({
    create: () => create(),
    title: 'Family IT Support Invoice Generator - Projects',
    favicon: 'assets/images/favicons/family-it-invoice-favicon.png',
  });

  describe('initial form', () => {
    beforeEach(() => create());

    it('starts with one empty line item with a quantity of 1', () => {
      expect(component.lineItems.length).toBe(1);
      expect(component.lineItems.at(0).value).toEqual({ description: '', quantity: '1', cost: '' });
    });

    it('defaults the date to today in yyyy-mm-dd format', () => {
      expect(component.invoiceForm.controls.date.value).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(component.invoiceForm.controls.date.value).toBe(component.getCurrentDate());
    });

    it('generates an invoice number', () => {
      const n = component.invoiceForm.controls.invoiceNumber.value!;
      expect(Number.isInteger(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(10000000);
    });

    it('is invalid until the required fields are filled', () => {
      expect(component.invoiceForm.invalid).toBe(true);
      fillValidForm();
      expect(component.invoiceForm.valid).toBe(true);
    });

    it('requires a payee, a payer and each line item field', () => {
      fillValidForm();
      for (const path of ['payeeName', 'payerName', 'lineItems.0.description', 'lineItems.0.cost']) {
        const control = component.invoiceForm.get(path)!;
        const value = control.value;
        control.setValue('');
        expect(component.invoiceForm.valid, path).toBe(false);
        control.setValue(value);
      }
    });

    it('does not require a payer company', () => {
      fillValidForm();
      expect(component.invoiceForm.controls.payerCompany.value).toBe('');
      expect(component.invoiceForm.valid).toBe(true);
    });
  });

  describe('getCurrentDate', () => {
    afterEach(() => vi.useRealTimers());

    it('zero-pads the month and day', () => {
      create();
      vi.useFakeTimers({ toFake: ['Date'] });
      vi.setSystemTime(new Date(2026, 2, 5, 12));
      expect(component.getCurrentDate()).toBe('2026-03-05');
    });
  });

  describe('line items', () => {
    beforeEach(() => create());

    it('addLineItem appends an empty line item', () => {
      component.addLineItem();
      expect(component.lineItems.length).toBe(2);
      expect(component.lineItems.at(1).value).toEqual({ description: '', quantity: '1', cost: '' });
    });

    it('removeLineItem removes the line item at that index', () => {
      component.addLineItem();
      component.lineItems.at(0).patchValue({ description: 'first' });
      component.lineItems.at(1).patchValue({ description: 'second' });

      component.removeLineItem(0);

      expect(component.lineItems.length).toBe(1);
      expect(component.lineItems.at(0).value.description).toBe('second');
    });

    it('rejects a quantity below 1', () => {
      component.lineItems.at(0).get('quantity')!.setValue('0');
      expect(component.lineItems.at(0).get('quantity')!.hasError('min')).toBe(true);
    });

    it('the Add and remove buttons change the number of rows', () => {
      el.querySelector<HTMLButtonElement>('.btn-secondary')!.click();
      fixture.detectChanges();
      expect(component.lineItems.length).toBe(2);
      expect(el.querySelectorAll('.btn-danger').length).toBe(2);

      el.querySelector<HTMLButtonElement>('.btn-danger')!.click();
      fixture.detectChanges();
      expect(component.lineItems.length).toBe(1);
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => create());

    it('prevents the default form submission', () => {
      const event = new Event('submit', { cancelable: true });
      component.onSubmit(event);
      expect(event.defaultPrevented).toBe(true);
    });

    it('does not build or save an invoice while the form is invalid', () => {
      const build = vi.spyOn(component, 'buildInvoice');
      const save = vi.spyOn(component, 'save').mockImplementation(() => {});

      component.onSubmit(new Event('submit'));

      expect(build).not.toHaveBeenCalled();
      expect(save).not.toHaveBeenCalled();
    });

    it('marks every field as touched when invalid so the errors show', () => {
      component.onSubmit(new Event('submit'));

      expect(component.invoiceForm.get('payeeName')!.touched).toBe(true);
      expect(component.invoiceForm.get('payerName')!.touched).toBe(true);
      expect(component.lineItems.at(0).get('description')!.touched).toBe(true);
      expect(component.lineItems.at(0).get('cost')!.touched).toBe(true);
    });

    it('does not submit with no line items', () => {
      fillValidForm();
      component.removeLineItem(0);
      const save = vi.spyOn(component, 'save').mockImplementation(() => {});

      component.onSubmit(new Event('submit'));

      expect(save).not.toHaveBeenCalled();
    });

    it('builds, saves and resets when the form is valid', () => {
      fillValidForm();
      const build = vi.spyOn(component, 'buildInvoice');
      const save = vi.spyOn(component, 'save').mockImplementation(() => {});
      const reset = vi.spyOn(component, 'reset');

      component.onSubmit(new Event('submit'));

      expect(build).toHaveBeenCalledTimes(1);
      expect(save).toHaveBeenCalledTimes(1);
      expect(reset).toHaveBeenCalledTimes(1);
    });

    it('is wired to the form submit event', () => {
      fillValidForm();
      const save = vi.spyOn(component, 'save').mockImplementation(() => {});

      el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));

      expect(save).toHaveBeenCalledTimes(1);
    });
  });

  describe('invoice building', () => {
    beforeEach(() => create());

    it('writes the payee and payer details into the PDF header', () => {
      fillValidForm();
      component.invoiceForm.patchValue({ payerCompany: 'Bob & Co' });
      const text = vi.spyOn(component.doc, 'text');

      component.header();

      const written = text.mock.calls.map(c => String(c[0]));
      expect(written).toContain('Name: Me');
      expect(written).toContain('Name: Uncle Bob');
      expect(written).toContain('Company: Bob & Co');
      expect(written).toContain('Invoice');
      expect(written).toContain('Company: The Family IT Support Company');
    });

    it('buildInvoice runs every section and records where the tables ended', () => {
      fillValidForm();
      component.buildInvoice();

      expect(component.lineItemTableY).toBeGreaterThan(60);
      expect(component.totalTableY).toBeGreaterThan(component.lineItemTableY);
    });

    it('save writes a PDF with the expected file name', () => {
      const save = vi.spyOn(component.doc, 'save').mockImplementation(() => component.doc);
      component.save();
      expect(save).toHaveBeenCalledWith('family-it-support-invoice.pdf');
    });

    it('reset starts a fresh document and clears the table positions', () => {
      fillValidForm();
      component.buildInvoice();
      const oldDoc = component.doc;

      component.reset();

      expect(component.doc).not.toBe(oldDoc);
      expect(component.lineItemTableY).toBe(0);
      expect(component.totalTableY).toBe(0);
    });
  });
});
