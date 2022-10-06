import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FeeService, InvoiceService } from "@core/services";
import { Fee, Invoice } from "@core/models";
import { CFeeStatus } from "@core/enums"
import { MatDialog } from '@angular/material/dialog';
import { DialogPaymentMethodsComponent } from 'src/app/shared/dialogs/dialog-payment-methods/dialog-payment-methods.component';
import { DialogFeeCreateComponent } from 'src/app/shared/dialogs/dialog-fee-create/dialog-fee-create.component';

@Component({
  selector: 'vs-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.scss']
})
export class PaymentDetailComponent implements OnInit {
  invoice: Invoice = new Invoice();
  fees: Fee[] = [];

  cFeeStatus = CFeeStatus;
  invoiceId = 0;

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
      this.invoiceId = parseInt(resp['id']);
      this.getInvoice(this.invoiceId);
      this.getFees(this.invoiceId);
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

  getInvoiceIdUpdated(invoiceId: number): void {
    this.getInvoice(invoiceId);
    this.getFees(invoiceId);
  }

  getFees(invoiceId: number): void {
    this.feeService.getByInvoice(invoiceId)
      .subscribe((resp) => this.fees = resp.filter((f) => f.active));
  }

  handlePaymentMethods(): void {
    this.dialog.open(DialogPaymentMethodsComponent, {
      width: '650px'
    })
  }

  openDialogForCreateFee(): void {
    const dialogref = this.dialog.open(DialogFeeCreateComponent, {
      width: '400px',
      data: {
        numberFee: this.fees.length + 1,
        invoiceId: this.invoiceId
      },
      autoFocus: false,
    });

    dialogref.afterClosed().subscribe((resp) => {
      resp && this.fees.push(resp);
      resp && this.getInvoice(this.invoiceId);
    })
  }
}
