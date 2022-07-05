import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { activeForm, loadProjects } from './store/project.actions';

import { AppStateProjectFeature } from './store/project.reducers';
import { projectFeatureActiveForm } from './store/project.selectors';

@Component({
  selector: 'vs-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  activeForm$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<AppStateProjectFeature>,
  ) { }

  ngOnInit(): void {
    this.activeForm$ = this.store.select(projectFeatureActiveForm);
    this.store.dispatch(loadProjects());
  }

  handleBtnNewProject(): void {
    this.store.dispatch(activeForm({ active: true }));
  }

}
