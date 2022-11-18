import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CRole } from '@core/enums';
import { Role, User } from '@core/models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { appState } from '../../../../app/app.reducers';
import { loadPerson, logout, unsetUser } from '../../ui.actions';
import { uiFeatureUser, uiRoleSelected } from '../../ui.selectors';

declare function toggleSidenav(): any;

@Component({
  selector: 'vs-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  subscription: Subscription = new Subscription();
  roleSelected: Role = new Role();
  cRole = CRole;

  title = '';
  user: User = new User();

  constructor(
    private store: Store<appState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getRoleSelected();
    this.getUser();
    this.getTitle();
  }

  getRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => {
        if (role.id) {
          this.roleSelected = role;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(unsetUser());
    this.store.dispatch(logout());
    this.router.navigateByUrl('auth/login');
  }

  getUser(): void {
    this.subscription.add(
      this.store.select(uiFeatureUser).subscribe((resp) => {
        this.user = resp;
        this.store.dispatch(loadPerson({ userId: this.user.id }));
      })
    )
  }

  getTitle() {
    this.subscription.add(
      this.activatedRoute.data.subscribe((resp) => this.title = resp['title'])
    )
  }

  toggleMenu() {
    toggleSidenav()
  }
}
