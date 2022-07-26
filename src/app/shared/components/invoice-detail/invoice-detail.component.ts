import {Component, Input, OnInit} from '@angular/core';

import {Invoice} from "@core/models";
import {CInvoiceStatus} from "../../../core/enums/invoice.enum";
import {InvoiceService} from "@core/services";

@Component({
  selector: 'vs-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  @Input() invoice: Invoice = new Invoice();
  @Input() showFees: boolean = false;

  cInvoiceStatus = CInvoiceStatus;

  constructor(
    private invoiceService: InvoiceService,
  ) {
  }

  ngOnInit(): void {
  }

  feePaidOut(paidOut: boolean) {
    paidOut && this.getInvoice();
  }

  getInvoice(): void {
    this.invoiceService.getInvoice(this.invoice.id)
      .subscribe((resp) => this.invoice = resp);
  }
}
