import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";

import { Invoice } from "@core/models";
import { CInvoiceStatus } from "../../../core/enums/invoice.enum";
import { CFeeStatus } from '@core/enums';
import { DialogInvoiceEditComponent } from '../../dialogs/dialog-invoice-edit/dialog-invoice-edit.component';

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
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  handleViewDetails(): void {
    this.router.navigateByUrl(`backoffice/pagos/${this.invoice.id}`);
  }

  handleEditTotalInvoice() {
    const dialogRef = this.matDialog.open(DialogInvoiceEditComponent, {
      width: '400px',
      data: this.invoice,
    });

    dialogRef.afterClosed().subscribe((resp) => {
      if(resp) {
        this.invoice.status = resp.status;
        this.invoice.total = resp.total;
      }
    })
  }
}
