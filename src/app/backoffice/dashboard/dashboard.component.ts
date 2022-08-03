import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {appState} from "../../app.reducers";
import {Role} from "@core/models";
import {Subscription} from "rxjs";
import {uiRoleSelected} from "../../shared/ui.selectors";
import {CRole} from "@core/enums";

@Component({
  selector: 'vs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  roleSelected: Role = new Role();
  cRole = CRole;

  constructor(private store: Store<appState>) {
  }

  ngOnInit(): void {
    this.getRoleSelected()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => this.roleSelected = resp)
    )
  }

}
