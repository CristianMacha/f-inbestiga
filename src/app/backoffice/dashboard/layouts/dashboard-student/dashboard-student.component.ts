import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {InvoiceService, ProjectService} from "@core/services";
import {Invoice, Project} from "@core/models";
import {appState} from "../../../../app.reducers";
import {Subscription} from "rxjs";
import {uiPerson} from "../../../../shared/ui.selectors";

@Component({
  selector: 'vs-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  projects: Project[] = [];
  invoices: Invoice[] = [];

  constructor(
    private projectService: ProjectService,
    private invoiceService: InvoiceService,
    private store: Store<appState>,
    ) { }

  ngOnInit(): void {
    this.getPerson();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProjects(personId: number): void {
    this.projectService.getByPerson(personId)
      .subscribe((resp) => this.projects = resp)
  }

  getInvoices(personId: number): void {
    this.invoiceService.getByPerson(personId)
      .subscribe((resp) => this.invoices = resp);
  }

  getPerson(): void {
    this.subscription.add(
      this.store.select(uiPerson).subscribe((resp) => {
        this.getProjects(resp.id);
        this.getInvoices(resp.id)
;      })
    )
  }

}
