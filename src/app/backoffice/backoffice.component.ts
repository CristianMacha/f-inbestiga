import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {FormControl, Validators} from "@angular/forms";

import {appState} from '../app.reducers';
import {PersonRoles, ResourceModel, User} from '@core/models';
import {loadPerson, loadPersonRoles, loadResources, loadRoleSelected, unsetUser} from '../shared/ui.actions';
import {uiFeatureUser, uiPersonRoles, uiResources, uiRoleSelected} from '../shared/ui.selectors';
import {ResourceService} from "@core/services";

declare function toggleSidenav(): any;

@Component({
  selector: 'vs-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  user$: Observable<User> = new Observable();
  user: User = new User();

  personRoles: PersonRoles[] = [];
  roleControl = new FormControl(0, Validators.required);
  resources: ResourceModel[] = [];

  btnCloseSidenav: boolean = false;

  constructor(
    private store: Store<appState>,
    private router: Router,
    private resourceService: ResourceService,
  ) {
  }

  ngOnInit(): void {
    this.getUser();
    this.store.dispatch(loadPersonRoles());
    this.getPersonRoles();
    this.roleControl.valueChanges.subscribe(resp => resp && this.store.dispatch(loadRoleSelected({roleId: resp})));
    this.getRoleSelected();
    this.getResources();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => this.dispatchResources(role.id))
    );
  }

  getResources(): void {
    this.subscription.add(
      this.store.select(uiResources).subscribe((resp) => this.resources = resp)
    )
  }

  dispatchResources(roleId: number): void {
    this.resourceService.getAllByRoleId(roleId)
      .subscribe((resp) => this.store.dispatch(loadResources({resources: resp})))
  }

  getPersonRoles(): void {
    this.subscription.add(
      this.store.select(uiPersonRoles).subscribe((resp) => {
        this.personRoles = resp;
        (this.personRoles.length > 0) && this.roleControl.patchValue(this.personRoles[0].role.id);
      })
    )
  }

  getUser(): void {
    this.subscription.add(
      this.store.select(uiFeatureUser).subscribe((resp) => {
        this.user = resp;
        this.store.dispatch(loadPerson({userId: this.user.id}));
      })
    )
  }

  logout() {
    this.store.dispatch(unsetUser());
    localStorage.clear();
    this.router.navigateByUrl('auth/login');
  }

  toggleSidenav(active: boolean) {
    toggleSidenav();
    this.btnCloseSidenav = active;
  }

}
