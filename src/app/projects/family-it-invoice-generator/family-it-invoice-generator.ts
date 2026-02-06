import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { FormArray, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

interface LineItem {
  description: string;
  quantity: string;
  cost: string;
}

@Component({
  selector: 'app-family-it-invoice-generator',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './family-it-invoice-generator.html',
  styleUrl: './family-it-invoice-generator.css',
})
export class FamilyItInvoiceGenerator {

  lineItemTableY: number = 0;
  totalTableY: number = 0;

  title: string = '🧾 Family IT Support Invoice Generator - Projects'
  doc: jsPDF = new jsPDF();
  invoiceForm = new FormGroup({
    payeeName: new FormControl<string>('', { validators: [Validators.required] }),
    date: new FormControl<string>(this.getCurrentDate(), { validators: [Validators.required] }),
    invoiceNumber: new FormControl<number>(Math.floor(Math.random() * 10000000) + 1),
    payerName: new FormControl<string>('', { validators: [Validators.required] }),
    payerCompany: new FormControl<string>(''),
    lineItems: new FormArray<FormGroup>([
      new FormGroup({
        description: new FormControl<string>('', { validators: [Validators.required] }),
        quantity: new FormControl<string>('1', { validators: [Validators.required, Validators.min(1)] }),
        cost: new FormControl<string>('', { validators: [Validators.required] }),
      })
    ])
  });

  constructor(titleService: Title) {
    titleService.setTitle(this.title);
  }

  getCurrentDate() {
    const date = new Date();
    const padStart = (value: number): string => value.toString().padStart(2, '0');
    return `${date.getFullYear()}-${padStart(date.getMonth() + 1)}-${padStart(date.getDate())}`;
  }

  get lineItems() {
    return this.invoiceForm.controls.lineItems as FormArray<FormGroup>;
  }

  addLineItem() {
    const group = new FormGroup({
      description: new FormControl<string>('', { validators: [Validators.required] }),
      quantity: new FormControl<string>('1', { validators: [Validators.required, Validators.min(1)] }),
      cost: new FormControl<string>('', { validators: [Validators.required ] })
    });

    // Add to array
    this.lineItems.push(group);
  }

  removeLineItem(index: number) {
    this.lineItems.removeAt(index);
  }

  header() {
    this.doc.setFont("helvetica", "bold");

    //first column
    this.doc.setFontSize(12);
    this.doc.text("Date: " + this.invoiceForm.controls.date.value, 10, 20);
    this.doc.text("Invoice #: " + this.invoiceForm.controls.invoiceNumber.value, 10, 25);

    this.doc.text("From", 10, 40);

    this.doc.setFont("helvetica", "normal");

    this.doc.text("Company: The Family IT Support Company", 10, 45);
    this.doc.text("Name: " + this.invoiceForm.controls.payeeName.value, 10, 50);

    //second column
    this.doc.setFontSize(40);
    this.doc.text("Invoice", 155, 25);

    this.doc.setFontSize(12);

    this.doc.setFont("helvetica", "bold");
    this.doc.text("Bill To", 110, 40);

    this.doc.setFont("helvetica", "normal");
    this.doc.text("Company: " + this.invoiceForm.controls.payerCompany.value, 110, 45);
    this.doc.text("Name: " + this.invoiceForm.controls.payerName.value, 110, 50);

  }

  printlineItems() {
    let rows = this.lineItems.controls.map(item => [
      item.get('description')?.value,
      item.get('quantity')?.value,
      item.get('cost')?.value,
    ]);
    autoTable(
      this.doc,
      {
        head: [['Description', 'Quantity', 'Cost']],
        body: rows,
        startY: 60,
        margin: 10
      },
    );
    this.lineItemTableY = (this.doc as any).lastAutoTable?.finalY ?? 60;
  }

  printConsolidatedTotals() {
    let rows = this.lineItems.controls.map(item => [
      item.get('cost')?.value,
      item.get('quantity')?.value
    ]);
    autoTable(
      this.doc,
      {
        head: [['Total', 'Quantity']],
        body: rows,
        startY: this.lineItemTableY += 5,
        margin: 10
      },
    );
    this.totalTableY = (this.doc as any).lastAutoTable?.finalY ?? 60;
  }

  footer() {
    let firstColumnY = this.totalTableY;

    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(12);

    //first column
    this.doc.text("Terms and Conditions", 10, firstColumnY += 10);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Please complete payment in 30 days.", 10, firstColumnY += 5, { maxWidth: 90 });
    this.doc.text("Don't renege. We know where you live.", 10, firstColumnY += 5, { maxWidth: 90 });

    //second column
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Send Payment To", 110, this.totalTableY += 10);

    this.doc.setFont("helvetica", "normal");
    this.doc.text("Name: " + this.invoiceForm.controls.payeeName.value, 110, this.totalTableY + 5, { maxWidth: 90 });

    //footer
    this.doc.setFont("helvetica", "normal");

    this.doc.setTextColor(0, 0, 255); // blue
    this.doc.textWithLink("www.matthewquerzoli.com", 75, 285, { url: "https://matthewquerzoli.com" });
    this.doc.setTextColor(255, 0, 0); // black
  }

  buildInvoice() {
    this.header();
    this.printlineItems();
    this.printConsolidatedTotals();
    this.footer();
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.invoiceForm.invalid || this.invoiceForm.controls.lineItems.length == 0) {
      this.invoiceForm.markAllAsTouched();
      this.markAllLineItemsTouched();
      return;
    }

    this.buildInvoice();
    this.save();
    this.reset();
  }

  markAllLineItemsTouched() {
    this.lineItems.controls.forEach(group => {
      Object.values(group.controls).forEach(control => control.markAsTouched());
    });
  }

  save() {
    this.doc.save("family-it-support-invoice.pdf");
  }

  reset() {

    this.doc = new jsPDF();
    this.lineItemTableY = 0;
    this.totalTableY = 0;

    this.invoiceForm.markAsPristine(); 
    this.invoiceForm.markAsUntouched(); 
    this.invoiceForm.updateValueAndValidity();

    this.invoiceForm.markAllAsTouched();

  }

}
