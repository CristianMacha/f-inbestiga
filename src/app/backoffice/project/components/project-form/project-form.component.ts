import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Person } from '@core/models';
import { PersonService, ProjectService } from '@core/services';
import { activeForm, createProject } from '../../store/project.actions';
import { AppStateProjectFeature } from '../../store/project.reducers';
import { ERole } from '@core/enums';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vs-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  codeControl = new FormControl();

  projectForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required),
    personProjects: new FormArray([], Validators.required),
    category: new FormGroup({
      id: new FormControl(0, Validators.required),
      name: new FormControl(''),
    }),
    invoices: new FormArray([
      new FormGroup({
        id: new FormControl(0, Validators.required),
        description: new FormControl('Total', Validators.required),
        expirationDate: new FormControl('2021-10-20 11:19:11', Validators.required),
        total: new FormControl(0, Validators.required),
      })
    ])
  });

  constructor(
    private store: Store<AppStateProjectFeature>,
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.handleCancel();
  }

  get personProjectsControls() {
    return this.projectForm.controls['personProjects'] as FormArray;
  }

  get invoicesControls() {
    return this.projectForm.controls['invoices'] as FormArray;
  }

  addPersonProjects(person: Person, roleId: number) {
    let isAdvisor;
    if (roleId === ERole.ADVISOR) { isAdvisor = true };
    if (roleId === ERole.STUDENT) { isAdvisor = false };

    const personProject = this.formBuilder.group({
      id: new FormControl(0, Validators.required),
      isAdvisor: new FormControl(isAdvisor, Validators.required),
      person: new FormGroup({
        id: new FormControl(person.id, Validators.required),
        fullname: new FormControl(person.fullname),
        surnames: new FormControl(person.surnames)
      }),
    });

    this.personProjectsControls.push(personProject);
  }

  removePersonProject(personProjectIndex: number) {
    this.personProjectsControls.removeAt(personProjectIndex);
  }

  handleCancel() {
    this.store.dispatch(activeForm({ active: false }));
  }

  handleSearchMember(roleId: number) {
    this.personService.getByCodeAndRole(this.codeControl.value, roleId)
      .subscribe({
        next: (resp) => {
          this.addPersonProjects(resp, roleId);
          this.codeControl.reset();
        },
        error: (error) => { }
      })
  }

  handleCreate(): void {
    this.projectForm.invalid ? this.projectForm.markAllAsTouched() : this.store.dispatch(createProject({ project: this.projectForm.value }));
  }

}
