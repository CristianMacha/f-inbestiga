import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {Invoice, Role} from "@core/models";
import {AppStatePaymentFeature} from "../../store/payment.reducers";
import {CInvoiceStatus, EInvoiceStatus} from "../../../../core/enums/invoice.enum";
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {InvoiceService} from "@core/services";
import {PageEvent} from "@angular/material/paginator";
import {ERole} from "@core/enums";
import {InvoiceFilterInterface} from "@core/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'vs-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.scss']
})
export class PaymentTableComponent implements OnInit {
  subscription: Subscription = new Subscription();
  invoices: Invoice[] = [];
  resultsLength = 0;

  roleSelected!: Role;
  displayedColumns: string[] = ['code', 'project', 'total', 'status', 'feesNumber', 'expirationDate', 'actions'];
  cInvoiceStatus = CInvoiceStatus;

  constructor(
    private store: Store<AppStatePaymentFeature>,
    private invoiceService: InvoiceService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getUiRoleSelectedState();
  }

  handleBtnView(invoice: Invoice): void {
    this.router.navigateByUrl(`backoffice/pagos/${invoice.id}`);
  }

  getUiRoleSelectedState(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => (resp.id) && this.getInvoices(resp.id, {
        status: EInvoiceStatus.ALL,
        take: 30,
        skip: 0
      }))
    )
  }

  getInvoices(roleId: number, filter: InvoiceFilterInterface): void {
    this.invoiceService.getInvoices(roleId, filter)
      .subscribe((resp) => {
        console.log(resp);

        this.resultsLength = resp.total;
        this.invoices = resp.data;
      });
  }

  pageEventInvoice(event: PageEvent) {
    this.getInvoices(ERole.STUDENT, {status: EInvoiceStatus.ALL, take: event.pageSize, skip: event.pageIndex});
  }

}
