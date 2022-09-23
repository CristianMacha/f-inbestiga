import {Component, OnDestroy, OnInit} from '@angular/core';
import {EProjectStatus} from "@core/enums";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";

import {AppStateProjectFeature} from "../../store/project.reducers";
import {setFilterStatus} from "../../store/project.actions";

@Component({
  selector: 'vs-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrls: ['./project-filter.component.scss']
})
export class ProjectFilterComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  roleId: number = 0;

  cProjectStatus: EProjectStatus[] = [EProjectStatus.ACCEPTED, EProjectStatus.COMPLETED, EProjectStatus.REQUIRED, EProjectStatus.REFUSED];
  statusControl: FormControl = new FormControl('ALL');

  constructor(private store: Store<AppStateProjectFeature>) {
  }

  ngOnInit(): void {
    this.statusControl.valueChanges.subscribe(value => this.store.dispatch(setFilterStatus({status: value})));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
