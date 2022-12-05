import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";

import { Invoice, Role } from "@core/models";
import { CInvoiceStatus } from "../../../core/enums/invoice.enum";
import { CFeeStatus, CRole } from '@core/enums';
import { DialogInvoiceEditComponent } from '../../dialogs/dialog-invoice-edit/dialog-invoice-edit.component';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { appState } from '../../../../app/app.reducers';
import { uiRoleSelected } from '../../ui.selectors';

@Component({
  selector: 'vs-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit, OnDestroy {
  @Input() showMembers: boolean = true;
  @Input() showInfoPayment: boolean = true;
  @Input() invoice: Invoice = new Invoice();
  @Input() showDetail: boolean = false;

  subscription = new Subscription();

  cInvoiceStatus = CInvoiceStatus;
  cFeeStatus = CFeeStatus;
  cRole = CRole;
  roleSelected = new Role();

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private store: Store<appState>,
  ) {
  }

  ngOnInit(): void {
    this.getRoleSelected();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  getRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => this.roleSelected = role)
    )
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
