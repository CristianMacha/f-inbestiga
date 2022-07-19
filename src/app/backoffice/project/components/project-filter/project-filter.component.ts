import {Component, OnDestroy, OnInit} from '@angular/core';
import {EProjectStatus} from "@core/enums";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";

import {AppStateProjectFeature} from "../../store/project.reducers";
import {loadProjectsFilter} from "../../store/project.actions";
import {uiRoleSelected} from "../../../../shared/ui.selectors";

@Component({
  selector: 'vs-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  roleId: number = 0;

  cProjectStatus: EProjectStatus[] = [EProjectStatus.PENDING, EProjectStatus.COMPLETED];
  statusControl: FormControl = new FormControl('ALL');

  constructor(private store: Store<AppStateProjectFeature>) {
    this.getUiRoleSelected()
  }

  ngOnInit(): void {
    this.statusControl.valueChanges.subscribe(value => this.store.dispatch(loadProjectsFilter({
      roleId: this.roleId,
      filter: {status: this.statusControl.value}
    })));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUiRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => this.roleId = resp.id)
    );
  }

}
