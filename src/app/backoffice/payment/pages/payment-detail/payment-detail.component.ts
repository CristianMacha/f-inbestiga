import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FeeService, InvoiceService} from "@core/services";
import {Fee, Invoice} from "@core/models";
import { MatDialog } from '@angular/material/dialog';
import { DialogPaymentMethodsComponent } from 'src/app/shared/dialogs/dialog-payment-methods/dialog-payment-methods.component';

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
    private router: Router,
    private invoiceService: InvoiceService,
    private feeService: FeeService,
    private dialog: MatDialog,
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
      .subscribe((resp) => {
        if (!resp) {
          this.router.navigateByUrl('backoffice/pagos');
        } else {
          this.invoice = resp;
        }
      });
  }

  getFees(invoiceId: number): void {
    this.feeService.getByInvoice(invoiceId)
      .subscribe((resp) => this.fees = resp);
  }

  handlePaymentMethods(): void {
    this.dialog.open(DialogPaymentMethodsComponent, {
      width: '650px'
    })
  }

}
