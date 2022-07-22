import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {Invoice, Project, Role} from '@core/models';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {
  activeFormR,
  loadProject,
  updateProjectActive,
} from '../../store/project.actions';
import {
  projectFeatureActiveFormR,
  projectFeatureProject,
} from '../../store/project.selectors';
import {CRole} from "@core/enums";
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {InvoiceService} from "@core/services";

@Component({
  selector: 'vs-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  projectId: number = 0;
  project: Project = new Project();

  invoices: Invoice[] = [];
  activeFormR: boolean = false;
  roleSelected: Role = new Role();
  cRole = CRole;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppStateProjectFeature>,
    private router: Router,
    private invoiceService: InvoiceService
  ) {
  }

  ngOnInit(): void {
    this.dispatchProjects();
    this.getActiveFormState();
    this.getProject();
    this.getRoleSelectedState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProject(): void {
    this.subscription.add(
      this.store
        .select(projectFeatureProject)
        .subscribe((resp) => (this.project = resp))
    );
  }

  handleUploadUpdate() {
    this.store.dispatch(activeFormR({active: true}));
  }

  handleBtnToggleActiveProject() {
    this.store.dispatch(updateProjectActive({projectId: this.projectId}));
  }

  handleBtnArrowBack() {
    this.router.navigateByUrl('backoffice/project');
  }

  dispatchProjects(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((resp) => {
        this.projectId = parseInt(resp['id']);
        this.getInvoices(this.projectId);
        this.store.dispatch(loadProject({projectId: this.projectId}));
      })
    );
  }

  getRoleSelectedState(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => this.roleSelected = resp),
    )
  }

  getActiveFormState(): void {
    this.subscription.add(
      this.store
        .select(projectFeatureActiveFormR)
        .subscribe((resp) => (this.activeFormR = resp))
    );
  }

  getInvoices(projectId: number): void {
    this.invoiceService.getByProject(projectId)
      .subscribe((resp) => this.invoices = resp);
  }
}
