import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

import {InvoiceService, ProjectService} from "@core/services";
import {Invoice, Person, Project} from "@core/models";
import {appState} from "../../../../app.reducers";
import {uiPerson} from "../../../../shared/ui.selectors";
import {
  DialogRequestProjectComponent
} from "../../../../shared/dialogs/dialog-request-project/dialog-request-project.component";

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

  constructor(
    private projectService: ProjectService,
    private invoiceService: InvoiceService,
    private store: Store<appState>,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
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
        this.person = resp;
        this.getProjects(resp.id);
        this.getInvoices(resp.id)
        ;
      })
    )
  }

}
