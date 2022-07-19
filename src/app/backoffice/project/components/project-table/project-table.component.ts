import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {Project} from '@core/models';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {activeFormUpdate, loadProjects} from '../../store/project.actions';
import {projectFeatureProjects} from '../../store/project.selectors';
import {uiRoleSelected} from "../../../../shared/ui.selectors";
import {CProjectStatus, EProjectStatus} from "@core/enums";

@Component({
  selector: 'vs-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {
  subscription: Subscription = new Subscription();
  projects$: Observable<Project[]> = new Observable();

  cProjectStatus = CProjectStatus;

  constructor(
    private store: Store<AppStateProjectFeature>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.projects$ = this.store.select(projectFeatureProjects);
    this.getUiRoleSelectedState();
  }

  handleBtnEdit(project: Project) {
    this.store.dispatch(activeFormUpdate({project}));
  }

  handleViewProject(projectId: number): void {
    this.router.navigateByUrl(`backoffice/project/${projectId}`);
  }

  getUiRoleSelectedState(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => resp.id && this.store.dispatch(loadProjects({roleId: resp.id})))
    )
  }
}
