import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FeeService, InvoiceService} from "@core/services";
import {Fee, Invoice} from "@core/models";

@Component({
  selector: 'vs-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {
  invoice: Invoice = new Invoice();
  fees: Fee[] = [];

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private feeService: FeeService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((resp) => {
      this.getInvoice(resp['id']);
      this.getFees(resp['id']);
    });
  }

  getInvoice(invoiceId: number): void {
    this.invoiceService.getInvoice(invoiceId)
      .subscribe((resp) => this.invoice = resp);
  }

  getFees(invoiceId: number): void {
    this.feeService.getByInvoice(invoiceId)
      .subscribe((resp) => this.fees = resp);
  }

}
