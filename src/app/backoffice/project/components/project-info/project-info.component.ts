import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {FormControl, Validators} from '@angular/forms';

import {Person, Project, Role} from '@core/models';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {projectFeatureProject} from '../../store/project.selectors';
import {ProjectService} from '@core/services';
import {loadProject} from '../../store/project.actions';
import {CProjectStatus, CRole} from "@core/enums";
import {uiRoleSelected} from "../../../../shared/ui.selectors";

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
  roleSelected: Role = new Role();
  cRole = CRole;

  constructor(
    private store: Store<AppStateProjectFeature>,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.getProject();
    this.getRoleSelected();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => {
        console.log((role.id == this.cRole.STUDENT));
        (role.id == this.cRole.STUDENT) && this.progressControl.disable();
        this.roleSelected = role;
      })
    )
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
        this.progressControl.patchValue(resp.progress);
        this.project.personProjects.forEach((pp) => {
          pp.isAdvisor ? this.advisors.push(pp.person) : this.students.push(pp.person);
        });
      })
    );
  }
}
