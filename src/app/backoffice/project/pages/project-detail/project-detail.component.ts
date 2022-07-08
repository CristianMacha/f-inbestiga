import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Project } from '@core/models';
import { AppStateProjectFeature } from '../../store/project.reducers';
import { loadProject, updateProjectActive } from '../../store/project.actions';
import { projectFeatureProject } from '../../store/project.selectors';

@Component({
  selector: 'vs-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  projectId: number = 0;
  project: Project = new Project();

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppStateProjectFeature>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.params.subscribe((resp) => {
        this.projectId = parseInt(resp['id']);
        this.store.dispatch(loadProject({ projectId: this.projectId }));
      })
    );
    this.getProject();
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

  handleBtnToggleActiveProject() {
    this.store.dispatch(updateProjectActive({ projectId: this.projectId }));
  }

  handleBtnArrowBack() {
    this.router.navigateByUrl('backoffice/project');
  }
}
