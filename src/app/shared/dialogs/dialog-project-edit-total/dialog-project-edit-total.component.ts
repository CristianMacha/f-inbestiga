import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {InvoiceService} from "@core/services";
import {Invoice} from "@core/models";
import {CInvoiceStatus} from "@core/enums";
import {UntypedFormControl, Validators} from "@angular/forms";
import {finalize} from "rxjs";

@Component({
  selector: 'vs-dialog-project-edit-total',
  templateUrl: './dialog-project-edit-total.component.html',
  styleUrls: ['./dialog-project-edit-total.component.scss']
})
export class DialogProjectEditTotalComponent implements OnInit {
  invoice!: Invoice;
  loading = false;

  cInvoiceStatus = CInvoiceStatus;
  totalControl = new UntypedFormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<DialogProjectEditTotalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invoiceId: number },
    private invoiceService: InvoiceService,
  ) {
  }

  ngOnInit(): void {
    this.getInvoice();
  }

  handleUpdate(): void {
    this.totalControl.invalid ? this.totalControl.markAsTouched() : this.updateTotal();
  }

  getInvoice(): void {
    this.invoiceService.getInvoice(this.data.invoiceId)
      .subscribe((resp) => {
        this.invoice = resp;
        this.totalControl.setValidators(Validators.min(resp.total));
      })
  }

  updateTotal(): void {
    this.loading = true;
    this.invoiceService.updateTotal(this.data.invoiceId, this.totalControl.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.dialogRef.close(true))
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
