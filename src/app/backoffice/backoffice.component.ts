import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from "@angular/forms";

import { appState } from '../app.reducers';
import { PersonRoles, ResourceModel, Role, User } from '@core/models';
import { loadPerson, loadPersonRoles, loadResources, loadRoleSelected, logout, unsetUser } from '../shared/ui.actions';
import { uiFeatureUser, uiPersonRoles, uiRoleSelected } from '../shared/ui.selectors';
import { AuthService, ResourceService } from "@core/services";
import { CRole } from "@core/enums";

declare function toggleSidenav(): any;

@Component({
  selector: 'vs-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss']
})
export class BackofficeComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  user: User = new User();

  personRoles: PersonRoles[] = [];
  roleControl = new FormControl(parseInt((localStorage.getItem('rId') as string)), Validators.required);
  resources: ResourceModel[] = [];
  roleSelected: Role = new Role();

  btnCloseSidenav: boolean = false;
  cRole = CRole;
  nameUrl: string = "";
  constructor(
    private store: Store<appState>,
    private router: Router,
    private resourceService: ResourceService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.getBreadcrum(this.router.url);
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let dato = localStorage.getItem('token');
        if (!dato) {
          this.router.navigateByUrl('auth/login');
        }
        console.log(e.url);
        this.getBreadcrum(e.url);

      }
    });
    this.getUser();
    this.store.dispatch(loadPersonRoles());
    this.store.dispatch(loadPerson({ userId: this.authService.user.id }))
    this.store.dispatch(loadRoleSelected({ roleId: parseInt((localStorage.getItem('rId') as string)) }))
    this.getPersonRoles();
    this.getRoleSelected();
    this.roleControl.valueChanges.subscribe((resp) => {
      resp && localStorage.setItem('rId', resp.toString());
      resp && this.getResourcesByRoleId(resp);
    })
  }

  ngOnDestroy(): void {
  }
  getBreadcrum(urlB:String): void{
    switch (urlB) {
      case urlB = "/backoffice/user":
        this.nameUrl = this.route.routeConfig?.children?.[0].data?.["title"];
        break;
      case urlB = "/backoffice/category":
        this.nameUrl = this.route.routeConfig?.children?.[1].data?.["title"];
        break;
      case urlB = "/backoffice/project":
        this.nameUrl = this.route.routeConfig?.children?.[2].data?.["title"];
        break;
      case urlB = "/backoffice/profile":
        this.nameUrl = this.route.routeConfig?.children?.[3].data?.["title"];
        break;
      case urlB = "/backoffice/pagos":
        this.nameUrl = this.route.routeConfig?.children?.[4].data?.["title"];
        break;
      case urlB = "/backoffice/project":
        this.nameUrl = this.route.routeConfig?.children?.[5].data?.["title"];
        break;
      default:
        this.nameUrl = this.route.routeConfig?.children?.[6].data?.["title"];
        break;
    }
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

  dispatchResources(roleId: number): void {
    this.resourceService.getAllByRoleId(roleId)
      .subscribe((resp) => this.store.dispatch(loadResources({ resources: resp })))
  }

  getPersonRoles(): void {
    this.subscription.add(
      this.store.select(uiPersonRoles).subscribe((resp) => {
        this.personRoles = resp;
        (this.personRoles.length > 0) && this.roleControl.patchValue(parseInt(localStorage.getItem('rId') as string));
      })
    )
  }

  getUser(): void {
    this.subscription.add(
      this.store.select(uiFeatureUser).subscribe((resp) => {
        this.user = resp;
        this.store.dispatch(loadPerson({ userId: this.user.id }));
      })
    )
  }

  getResourcesByRoleId(roleId: number): void {
    this.resourceService.getAllByRoleId(roleId)
      .subscribe((resp) => {
        this.resources = resp;
        this.authService.setResources(resp);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.store.dispatch(unsetUser());
    this.store.dispatch(logout());
    this.router.navigateByUrl('auth/login');
  }

  toggleSidenav(active: boolean) {
    toggleSidenav();
    this.btnCloseSidenav = active;
  }
}
