import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {Invoice} from "@core/models";
import {CInvoiceStatus} from "../../../core/enums/invoice.enum";
import {DialogInvoicePaymentComponent} from "../../dialogs/dialog-invoice-payment/dialog-invoice-payment.component";

@Component({
  selector: 'vs-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  @Input() invoice: Invoice = new Invoice();
  cInvoiceStatus = CInvoiceStatus;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  handleViewMoreDetail(): void {
    const dialogRef = this.dialog.open(DialogInvoicePaymentComponent, {
      width: '500px',
      data: {invoiceId: this.invoice.id}
    })
  }

}
