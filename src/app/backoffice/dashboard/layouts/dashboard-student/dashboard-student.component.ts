import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {finalize, Subscription} from "rxjs";

import {InvoiceService, ProjectService} from "@core/services";
import {Invoice, Person, Project} from "@core/models";
import {appState} from "../../../../app.reducers";
import {uiPerson, uiRoleSelected} from "../../../../shared/ui.selectors";
import {
  DialogRequestProjectComponent
} from "../../../../shared/dialogs/dialog-request-project/dialog-request-project.component";
import {PageEvent} from "@angular/material/paginator";
import {EProjectStatus, ERole} from "@core/enums";

@Component({
  selector: 'vs-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  projects: Project[] = [];
  invoices: Invoice[] = [];
  person: Person = new Person();
  resultsLength = 0;
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
      dialogRef.afterClosed().subscribe((resp) => resp && this.getProjects(this.person.id))
    );
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

  getInvoices(personId: number): void {
    this.invoiceService.getByPerson(personId)
      .subscribe((resp) => this.invoices = resp);
  }

  getUiRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => this.getProjects(role.id))
    );
  }

  getPerson(): void {
    this.subscription.add(
      this.store.select(uiPerson).subscribe((resp) => this.getInvoices(resp.id))
    )
  }

  pageEvent(event: PageEvent) {
    this.getProjects(ERole.STUDENT, event.pageSize, event.pageIndex);
  }

}
