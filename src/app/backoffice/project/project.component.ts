import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {activeForm} from './store/project.actions';

import {AppStateProjectFeature} from './store/project.reducers';
import {projectFeatureActiveForm} from './store/project.selectors';
import {uiRoleSelected} from "../../shared/ui.selectors";
import {Role} from "@core/models";
import {CRole} from "@core/enums";
import { Router } from '@angular/router';

@Component({
  selector: 'vs-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  activeForm: boolean = false;
  roleSelected: Role = new Role();
  cRole = CRole;

  constructor(
    private store: Store<AppStateProjectFeature>,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getActiveFormState();
    this.getRoleSelectedState();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleBtnNewProject(): void {
    this.router.navigateByUrl(`backoffice/project/new`);
  }

  getActiveFormState(): void {
    this.subscription.add(
      this.store.select(projectFeatureActiveForm).subscribe((resp) => this.activeForm = resp)
    );
  }

  getRoleSelectedState(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => this.roleSelected = resp)
    )
  }

}
