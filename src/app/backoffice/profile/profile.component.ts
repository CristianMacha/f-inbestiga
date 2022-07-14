import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";

import {appState} from "../../app.reducers";
import {Person, Role} from "@core/models";
import {Subscription} from "rxjs";
import {uiPerson, uiRoleSelected} from "../../shared/ui.selectors";

@Component({
  selector: 'vs-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  person: Person = new Person();
  role: Role = new Role();

  constructor(private store: Store<appState>) {
  }

  ngOnInit(): void {
    this.getPerson();
    this.getRole();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPerson(): void {
    this.subscription.add(
      this.store.select(uiPerson).subscribe((resp) => this.person = resp)
    )
  }

  getRole(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((resp) => this.role = resp)
    )
  }

}
