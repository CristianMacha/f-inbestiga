import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Project } from '@core/models';
import { AppStateProjectFeature } from '../../store/project.reducers';
import { activeFormUpdate, loadProjects } from '../../store/project.actions';
import { projectFeatureProjects } from '../../store/project.selectors';

@Component({
  selector: 'vs-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.scss']
})
export class ProjectTableComponent implements OnInit {
  projects$: Observable<Project[]> = new Observable();

  constructor(
    private store: Store<AppStateProjectFeature>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(loadProjects());
    this.projects$ = this.store.select(projectFeatureProjects);
  }

  handleBtnEdit(project: Project) {
    this.store.dispatch(activeFormUpdate({ project }));
  }

  handleViewProject(projectId: number): void {
    this.router.navigateByUrl(`backoffice/project/${projectId}`);
  }
}
