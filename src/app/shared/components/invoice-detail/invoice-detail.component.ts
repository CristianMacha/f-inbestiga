import { Component, Input, OnInit } from '@angular/core';

import { Invoice } from "@core/models";
import { CInvoiceStatus } from "../../../core/enums/invoice.enum";
import { Router } from "@angular/router";
import { CFeeStatus } from '@core/enums';
import { FeeService } from '@core/services';

@Component({
  selector: 'vs-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  @Input() showMembers: boolean = true;
  @Input() showInfoPayment: boolean = true;
  @Input() invoice: Invoice = new Invoice();
  @Input() showDetail: boolean = false;

  cInvoiceStatus = CInvoiceStatus;
  cFeeStatus = CFeeStatus;

  constructor(
    private router: Router,
    private feeService: FeeService,
  ) {
  }

  ngOnInit(): void {
  }

  handleViewDetails(): void {
    this.router.navigateByUrl(`backoffice/pagos/${this.invoice.id}`);
  }
}
