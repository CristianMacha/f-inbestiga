import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'vs-dialog-invoice-payment',
  templateUrl: './dialog-invoice-payment.component.html',
  styleUrls: ['./dialog-invoice-payment.component.scss']
})
export class DialogInvoicePaymentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogInvoicePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invoiceId: number },
  ) {
  }

  ngOnInit(): void {
  }

}
