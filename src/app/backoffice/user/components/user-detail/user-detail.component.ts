import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Person, Project } from '@core/models';
import { AppStateUserFeature } from '../../store/user.reducer';
import { userFeaturePerson } from '../../store/user.selectors';
import { activeFormUpdate, closeDetails } from '../../store/user.actions';
import { ProjectService } from '@core/services';

@Component({
  selector: 'vs-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  person: Person = new Person();
  projects: Project[] = [];

  constructor(
    private store: Store<AppStateUserFeature>,
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.getPerson();
   }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPerson(): void {
    this.subscription.add(
      this.store.select(userFeaturePerson)
        .subscribe(
          (resp) => {
            this.person = resp;
            this.getProjetcs(resp.id)
          },
        )
    )
  }

  getProjetcs(personId: number): void {
    this.projectService.getByPerson(personId)
      .subscribe(
        (resp) => this.projects = resp,
      )
  }

  handleBtnEditUser() {
    this.store.dispatch(activeFormUpdate({ person: this.person }));
  }

  handleBtnBack() {
    this.store.dispatch(closeDetails());
  }

}
