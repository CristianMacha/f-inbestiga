import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {activeForm} from './store/project.actions';

import {AppStateProjectFeature} from './store/project.reducers';
import {projectFeatureActiveForm} from './store/project.selectors';

@Component({
  selector: 'vs-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  subscription: Subscription = new Subscription();

  activeForm$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<AppStateProjectFeature>,
  ) {
  }

  ngOnInit(): void {
    this.activeForm$ = this.store.select(projectFeatureActiveForm);
  }

  handleBtnNewProject(): void {
    this.store.dispatch(activeForm({active: true}));
  }

}
