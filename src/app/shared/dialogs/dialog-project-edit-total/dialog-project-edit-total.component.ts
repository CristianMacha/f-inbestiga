import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InvoiceService} from "@core/services";
import {Invoice} from "@core/models";
import {CInvoiceStatus} from "@core/enums";

@Component({
  selector: 'vs-dialog-project-edit-total',
  templateUrl: './dialog-project-edit-total.component.html',
  styleUrls: ['./dialog-project-edit-total.component.scss']
})
export class DialogProjectEditTotalComponent implements OnInit {
  invoice!: Invoice;

  cInvoiceStatus = CInvoiceStatus;

  constructor(
    public dialogRef: MatDialogRef<DialogProjectEditTotalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invoiceId: number },
    private invoiceService: InvoiceService,
  ) {
  }

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice(): void {
    this.invoiceService.getInvoice(this.data.invoiceId)
      .subscribe((resp) => this.invoice = resp)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
