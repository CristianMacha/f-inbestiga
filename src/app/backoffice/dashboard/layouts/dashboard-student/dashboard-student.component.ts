import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {EInvoiceStatus, EProjectStatus, ERole} from "@core/enums";
import {finalize, Subscription} from "rxjs";

import {InvoiceService, ProjectService} from "@core/services";
import {Invoice, Person, Project} from "@core/models";
import {appState} from "../../../../app.reducers";
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {
  DialogRequestProjectComponent
} from "../../../../shared/dialogs/dialog-request-project/dialog-request-project.component";
import {PageEvent} from "@angular/material/paginator";
import {InvoiceFilterInterface, ProjectInterfaceFilter} from "@core/interfaces";

@Component({
  selector: 'vs-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  projects: Project[] = [];
  resultsLength = 0;

  invoices: Invoice[] = [];
  resultsInvoiceLength = 0;
  person: Person = new Person();
  loading: boolean = false;

  constructor(
    private projectService: ProjectService,
    private invoiceService: InvoiceService,
    private store: Store<appState>,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getUiRoleSelected();
    this.getPerson();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleRequestProject(): void {
    const dialogRef = this.matDialog.open(DialogRequestProjectComponent, {
      width: '400px',
      data: {personId: this.person.id}
    });

    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.getProjects(this.person.id, {
        status: EProjectStatus.ALL,
        take: 3,
        skip: 0
      }))
    );
  }

  getProjects(roleId: number, filter: ProjectInterfaceFilter): void {
    this.loading = true;
    this.projectService.getProjects(roleId, filter)
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

  getUiRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => role.id && this.getProjects(role.id, {
        status: EProjectStatus.ALL,
        take: 3,
        skip: 0
      }))
    );
  }

  getPerson(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => resp.id && this.getInvoices(resp.id, {
        status: EInvoiceStatus.ALL,
        take: 3,
        skip: 0
      }))
    )
  }

  pageEvent(event: PageEvent) {
    this.getProjects(ERole.STUDENT, {status: EProjectStatus.ALL, take: event.pageSize, skip: event.pageIndex});
  }

  pageEventInvoice(event: PageEvent) {
    this.getInvoices(ERole.STUDENT, {status: EInvoiceStatus.ALL, take: event.pageSize, skip: event.pageIndex});
  }

}
