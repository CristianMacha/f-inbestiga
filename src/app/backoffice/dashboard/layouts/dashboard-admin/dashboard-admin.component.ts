import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {finalize, Subscription} from "rxjs";

import {InvoiceService, ProjectService} from "@core/services";
import {EInvoiceStatus, EProjectStatus, ERole} from "@core/enums";
import {Invoice, Project} from "@core/models";
import {appState} from "../../../../app.reducers";
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {InvoiceFilterInterface} from "@core/interfaces";

@Component({
  selector: 'vs-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  resultsLength = 0;
  projects: Project[] = [];
  loading: boolean = false;

  invoices: Invoice[] = [];
  resultsInvoiceLength = 0;

  constructor(
    private projectService: ProjectService,
    private store: Store<appState>,
    private invoiceService: InvoiceService,
  ) {
  }

  ngOnInit(): void {
    this.getRoleSelected();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => {
        if (role.id) {
          this.getProjects(role.id);
          this.getInvoices(role.id, {
            status: EInvoiceStatus.ALL,
            take: 3,
            skip: 0
          })
        }
      })
    )
  }

  getProjects(roleId: number, take: number = 3, skip = 0): void {
    this.loading = true;
    this.projectService.getProjects(roleId, {status: EProjectStatus.ALL, take, skip})
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.resultsLength = resp.total;
        this.projects = resp.data;
      });
  }

  getInvoices(roleId: number, filter: InvoiceFilterInterface): void {
    this.invoiceService.getInvoices(roleId, filter)
      .subscribe((resp) => {
        this.resultsInvoiceLength = resp.total;
        this.invoices = resp.data;
      });
  }

  pageEvent(event: PageEvent) {
    this.getProjects(ERole.ADMINISTRATOR, event.pageSize, event.pageIndex);
  }

  pageEventInvoice(event: PageEvent) {
    this.getInvoices(ERole.STUDENT, {status: EInvoiceStatus.ALL, take: event.pageSize, skip: event.pageIndex});
  }

}
