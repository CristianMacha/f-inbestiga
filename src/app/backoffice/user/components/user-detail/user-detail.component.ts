import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

import {Person, Project} from '@core/models';
import {PersonService, ProjectService} from '@core/services';
import {AppStateUserFeature} from '../../store/user.reducer';
import {userFeaturePerson} from '../../store/user.selectors';
import {activeFormUpdate, closeDetails} from '../../store/user.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'vs-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  persontId: number = 0;
  userPerson:any;
  person: Person = new Person();
  projects: Project[] = [];

  constructor(
    private store: Store<AppStateUserFeature>,
    private projectService: ProjectService,
    private personService:PersonService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((resp) => {
      this.persontId = parseInt(resp['id']);
      this.getPerson(this.persontId);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getPerson(persontId:number): void {
    this.personService.getByUser(persontId).subscribe((resp)=>{
      this.userPerson=resp;
      console.log(resp)
      this.getProjects(resp.id)
    })
  }

  getProjects(personId: number): void {
    this.projectService.getByPerson(personId)
      .subscribe(
        (resp) => {
          console.log(resp)
          this.projects = resp},
      )
  }

  handleBtnEditUser(personId: number) {
    this.router.navigateByUrl(`backoffice/user/${personId}`).then();
  }

  handleBtnBack() {
    this.router.navigateByUrl(`backoffice/user`).then();
  }

}
