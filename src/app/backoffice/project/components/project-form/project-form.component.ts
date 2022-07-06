import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Person } from '@core/models';
import { PersonService } from '@core/services';
import { activeForm } from '../../store/project.actions';
import { AppStateProjectFeature } from '../../store/project.reducers';

@Component({
  selector: 'vs-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  codeControl = new FormControl();

  projectForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required),
    personProjects: new FormArray([]),
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
    private personService: PersonService
    ) { }

  ngOnInit(): void {
  }

  get personProjectsControls() {
    return this.projectForm.controls['personProjects'] as FormArray;
  }

  get invoicesControls() {
    return this.projectForm.controls['invoices'] as FormArray;
  }

  addPersonProjects(person: Person, isAdvisor: boolean) {
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
    roleId
    this.personService.getByCodeAndRole(this.codeControl.value, roleId)
      .subscribe(
        // (resp) => this.addPersonProjects(resp)
      )
  }

}
