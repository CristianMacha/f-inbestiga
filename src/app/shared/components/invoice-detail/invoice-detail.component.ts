import {Component, Input, OnInit} from '@angular/core';

import {Fee, Invoice} from "@core/models";
import {CInvoiceStatus} from "../../../core/enums/invoice.enum";

@Component({
  selector: 'vs-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  @Input() invoice: Invoice = new Invoice();
  @Input() showFees: boolean = false;

  cInvoiceStatus = CInvoiceStatus;

  fees: Fee[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}
