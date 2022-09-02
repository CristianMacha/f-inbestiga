import {Component, Input, OnInit} from '@angular/core';

import {Invoice} from "@core/models";
import {CInvoiceStatus} from "../../../core/enums/invoice.enum";
import {InvoiceService} from "@core/services";
import {Router} from "@angular/router";

@Component({
  selector: 'vs-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  @Input() invoice: Invoice = new Invoice();
  @Input() showDetail: boolean = false;

  cInvoiceStatus = CInvoiceStatus;

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  handleViewDetails(): void {
    this.router.navigateByUrl(`backoffice/pagos/${this.invoice.id}`);
  }
}
