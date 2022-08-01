import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';

import {Person, Project} from '@core/models';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {projectFeatureProject} from '../../store/project.selectors';
import {ProjectService} from '@core/services';
import {loadProject} from '../../store/project.actions';
import {CProjectStatus} from "@core/enums";

@Component({
  selector: 'vs-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
})
export class ProjectInfoComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  progressControl: FormControl = new FormControl('', Validators.required);

  project: Project = new Project();
  students: Person[] = [];
  advisors: Person[] = [];
  cProjectStatus = CProjectStatus;

  constructor(
    private store: Store<AppStateProjectFeature>,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.getProject();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleUpdateProgress(): void {
    this.projectService
      .updateProgress(this.project.id, this.progressControl.value)
      .subscribe((resp) => {
        this.students = [];
        this.advisors = [];
        this.progressControl.reset(resp.progress);
        this.store.dispatch(loadProject({projectId: resp.id}));
      });
  }

  getProject(): void {
    this.subscription.add(
      this.store.select(projectFeatureProject).subscribe((resp) => {
        this.project = resp;
        (this.project.status == this.cProjectStatus.REQUIRED) ? this.progressControl.disable() : this.progressControl.enable();
        this.progressControl.patchValue(resp.progress);
        this.project.personProjects.forEach((pp) => {
          pp.isAdvisor ? this.advisors.push(pp.person) : this.students.push(pp.person);
        });
      })
    );
  }
}
