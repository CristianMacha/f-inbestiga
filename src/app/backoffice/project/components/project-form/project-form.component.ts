import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { PersonProject, Project } from '@core/models';
import { PersonService, ProjectService } from '@core/services';
import { activeForm, createProject, loadProject, updateProject } from '../../store/project.actions';
import { AppStateProjectFeature } from '../../store/project.reducers';
import { ERole } from '@core/enums';
import { Subscription } from 'rxjs';
import { projectFeature, projectFeatureEditMode, projectFeatureProject } from '../../store/project.selectors';
import * as moment from 'moment';

@Component({
  selector: 'vs-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  codeControl = new FormControl();
  editMode: boolean = false;
  title: string = 'Nuevo proyecto';
  btnActionText: string = 'Crear proyecto';
  projectTemp: Project = new Project();

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
    this.getEditModeState();
    this.getProject();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.handleCancel();
  }

  get personProjectsControls() {
    return this.projectForm.controls['personProjects'] as FormArray;
  }

  get invoicesControls() {
    return this.projectForm.controls['invoices'] as FormArray;
  }

  getProject() {
    this.projectService.getProject(this.projectTemp.id)
      .subscribe(
        (resp) => {
          resp.expirationDate = moment(resp.expirationDate).format('yyyy-MM-DD');
          this.projectForm.patchValue(resp);
          resp.personProjects.forEach(pp => {
            this.addPersonProjects(pp);
          });
          console.log(resp)
        },
      )
  }

  addPersonProjects(personProject: PersonProject) {
    const personProjectControl = this.formBuilder.group({
      id: new FormControl(personProject.id, Validators.required),
      isAdvisor: new FormControl(personProject.isAdvisor, Validators.required),
      active: new FormControl(true, Validators.required),
      person: new FormGroup({
        id: new FormControl(personProject.person.id, Validators.required),
        fullname: new FormControl(personProject.person.fullname),
        surnames: new FormControl(personProject.person.surnames)
      }),
    });

    this.personProjectsControls.push(personProjectControl);
  }

  removePersonProject(personProjectIndex: number) {
    this.personProjectsControls.removeAt(personProjectIndex);
  }

  handleCancel() {
    this.store.dispatch(activeForm({ active: false }));
  }

  handleSearchMember(roleId: number) {
    let isAdvisor: boolean;
    if (roleId === ERole.ADVISOR) { isAdvisor = true };
    if (roleId === ERole.STUDENT) { isAdvisor = false };

    this.personService.getByCodeAndRole(this.codeControl.value, roleId)
      .subscribe({
        next: (resp) => {
          const newPersonProject = new PersonProject();
          newPersonProject.isAdvisor = isAdvisor;
          newPersonProject.person = resp;

          this.addPersonProjects(newPersonProject);
          this.codeControl.reset();
        },
        error: (error) => { }
      })
  }

  getEditModeState() {
    this.subscription.add(
      this.store.select(projectFeature).subscribe(
        (resp) => {
          if (resp.editMode) {
            this.editMode = true;
            this.title = 'Actualizar projecto';
            this.btnActionText = 'Guardar cambios';
            this.projectTemp = resp.project;
           }
        }
      )
    )
  }

  handleCreate(): void {
    if(this.editMode) {
      this.projectForm.invalid ? this.projectForm.markAllAsTouched() : this.store.dispatch(updateProject({ project: this.projectForm.value }));
    } else {
      this.projectForm.invalid ? this.projectForm.markAllAsTouched() : this.store.dispatch(createProject({ project: this.projectForm.value }));
    }
  }

}
