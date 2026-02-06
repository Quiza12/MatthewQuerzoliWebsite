import { Component, Signal, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Title } from "@angular/platform-browser";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { config } from 'process';
import { FormArray, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';



interface LineItem {
  description: string;
  quantity: string;
  cost: string;
  total: string;
}

interface InvoiceData {
  name: string;
  date: string;
  invoiceNumber: number;
  lineItems: LineItem[];
  billTo: string;
}

@Component({
  selector: 'app-family-it-invoice-generator',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './family-it-invoice-generator.html',
  styleUrl: './family-it-invoice-generator.css',
})
export class FamilyItInvoiceGenerator {

  title: string = '🧾 Family IT Invoice Generator - Projects'
  doc: jsPDF = new jsPDF();
  invoiceForm = new FormGroup({
    name: new FormControl<string>(''),
    date: new FormControl<string>(this.getCurrentDate()),
    invoiceNumber: new FormControl<number>(Math.floor(Math.random() * 10000000) + 1),
    billTo: new FormControl<string>(''),
    lineItems: new FormArray<FormGroup>([
      new FormGroup({
        description: new FormControl<string>(''),
        quantity: new FormControl<string>(''),
        cost: new FormControl<string>(''),
        total: new FormControl<string>(''),
      })
    ])
  });

  getCurrentDate() {
    const date = new Date();
    const padStart = (value: number): string => value.toString().padStart(2, '0');
    return `${date.getFullYear()}-${padStart(date.getMonth() + 1)}-${padStart(date.getDate())}`;
  }

  get lineItems() {
    return this.invoiceForm.controls.lineItems as FormArray<FormGroup>;
  }

  addLineItem() {
    this.lineItems.push(
      new FormGroup({
        description: new FormControl<string>(''),
        quantity: new FormControl<string>(''),
        cost: new FormControl<string>(''),
        total: new FormControl<string>(''),
      })
    );
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

    this.doc.text("From:", 10, 40);

    this.doc.setFont("helvetica", "normal");
    this.doc.text("Company: The Family/Friend IT Helper Company, Ltd", 10, 45);
    this.doc.text("Name: " + this.invoiceForm.controls.name.value, 10, 50);
    this.doc.text("Address " + "123 Fake St, Suburbia", 10, 55, { maxWidth: 90 });


    //second column
    this.doc.setFontSize(40);
    this.doc.text("Invoice", 155, 25);

    this.doc.setFontSize(12);

    this.doc.setFont("helvetica", "bold");
    this.doc.text("Bill To: " + this.invoiceForm.controls.billTo.value, 110, 40);

    this.doc.setFont("helvetica", "normal");
    this.doc.text("Company: QLoans", 110, 45);
    this.doc.text("Name: " + "David Querzoli", 110, 50);
    this.doc.text("Address " + "?", 110, 55, { maxWidth: 90 });

  }

  printlineItems() {

    let rows = this.lineItems.controls.map(item => [
      item.get('description')?.value,
      item.get('quantity')?.value,
      item.get('cost')?.value,
      item.get('total')?.value
    ]);
    autoTable(
      this.doc,
      {
        head: [['Description', 'Quantity', 'Cost', 'Total']],
        body: rows,
        startY: 65,
        margin: 10
      },
    );
  }

  footer() {
    this.doc.setFont("helvetica", "bold");
    this.doc.setFontSize(12);

    //first column
    this.doc.text("Terms and Conditions:", 10, 260);
    this.doc.setFont("helvetica", "normal");
    this.doc.text("Please complete payment in 30 days.", 10, 265, { maxWidth: 90 });
    this.doc.text("Don't renege. We know where you live.", 10, 270, { maxWidth: 90 });

    //second column
    this.doc.setFont("helvetica", "bold");
    this.doc.text("Send Payment To:", 110, 260);

    this.doc.setFont("helvetica", "normal");
    this.doc.text("Name: " + "David Querzoli", 110, 265, { maxWidth: 90 });
  }

  buildInvoice() {
    this.header();
    this.printlineItems();
    this.footer();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.buildInvoice();
    this.save();
  }

  save() {
    this.doc.save("invoice.pdf");
  }

}
