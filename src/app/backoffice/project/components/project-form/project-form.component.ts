import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {Store} from '@ngrx/store';
import {finalize, Subscription} from 'rxjs';
import * as moment from 'moment';

import {Category, Person, PersonProject, Project, Role} from '@core/models';
import {CategoryService, PersonService, ProjectService} from '@core/services';
import {CRole, EProjectStatus, ERole} from '@core/enums';
import {activeForm, createProject, updateProject,} from '../../store/project.actions';
import {AppStateProjectFeature} from '../../store/project.reducers';
import {projectFeature} from '../../store/project.selectors';
import {uiFeature} from "../../../../shared/ui.selectors";

@Component({
  selector: 'vs-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
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
    description: new FormControl(''),
    expirationDate: new FormControl('', Validators.required),
    personProjects: new FormArray([]),
    category: new FormGroup({
      id: new FormControl(0, [Validators.required, Validators.min(1)]),
      name: new FormControl(''),
    }),
    invoices: new FormArray([
      new FormGroup({
        id: new FormControl(0, Validators.required),
        description: new FormControl('Total', Validators.required),
        expirationDate: new FormControl(
          '2021-10-20 11:19:11',
          Validators.required
        ),
        total: new FormControl(0, [Validators.required, Validators.min(1)]),
      }),
    ]),
  });

  categories: Category[] = [];
  loading: boolean = false;
  roleSelected: Role = new Role();
  personAuth: Person = new Person();
  cRole = CRole;

  constructor(
    private store: Store<AppStateProjectFeature>,
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private projectService: ProjectService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
    this.getEditModeState();
    this.getUiState();
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
    this.projectService.getProject(this.projectTemp.id).subscribe((resp) => {
      resp.expirationDate = moment(resp.expirationDate).format('yyyy-MM-DD');
      this.projectForm.patchValue(resp);
      resp.personProjects.forEach((pp) => {
        this.addPersonProjects(pp);
      });
    });
  }

  addPersonProjects(personProject: PersonProject) {
    const personProjectControl = this.formBuilder.group({
      id: new FormControl(personProject.id),
      isAdvisor: new FormControl(personProject.isAdvisor),
      active: new FormControl(personProject.active),
      person: new FormGroup({
        id: new FormControl(personProject.person.id),
        fullname: new FormControl(personProject.person.fullname),
        surnames: new FormControl(personProject.person.surnames),
      }),
    });

    this.personProjectsControls.push(personProjectControl);
  }

  removePersonProject(personProjectIndex: number) {
    if (this.editMode) {
      (
        this.personProjectsControls.controls[personProjectIndex] as FormGroup
      ).controls['active'].patchValue(false);
    } else {
      this.personProjectsControls.removeAt(personProjectIndex);
    }
  }

  restorePersonProject(personProjectIndex: number) {
    (
      this.personProjectsControls.controls[personProjectIndex] as FormGroup
    ).controls['active'].patchValue(true);
  }

  handleCancel() {
    this.store.dispatch(activeForm({active: false}));
  }

  handleSearchMember(roleId: number) {
    let isAdvisor: boolean;
    if (roleId === ERole.ADVISOR) {
      isAdvisor = true;
    }
    if (roleId === ERole.STUDENT) {
      isAdvisor = false;
    }

    this.personService
      .getByCodeAndRole(this.codeControl.value, roleId)
      .subscribe({
        next: (resp) => {
          const newPersonProject = new PersonProject();
          newPersonProject.isAdvisor = isAdvisor;
          newPersonProject.person = resp;

          this.addPersonProjects(newPersonProject);
          this.codeControl.reset();
        }
      });
  }

  getEditModeState() {
    this.subscription.add(
      this.store.select(projectFeature).subscribe((resp) => {
        this.loading = resp.loading;
        if (resp.editMode) {
          this.editMode = true;
          this.title = 'Actualizar projecto';
          this.btnActionText = 'Guardar cambios';
          this.projectTemp = resp.project;
          this.getProject();
        }
      })
    );
  }

  handleCreate(): void {
    this.loading = true;
    if (this.projectForm.invalid) {
      this.loading = false;
      this.projectForm.markAllAsTouched();
    } else {
      this.editMode ? this.store.dispatch(updateProject({project: this.projectForm.value})) : this.store.dispatch(createProject({project: this.projectForm.value}));
    }
  }

  getCategories(): void {
    this.loading = true;
    this.categoryService
      .getCategories()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((resp) => (this.categories = resp));
  }

  getUiState(): void {
    this.subscription.add(
      this.store.select(uiFeature).subscribe((resp) => {
        this.roleSelected = resp.roleSelected;
        this.personAuth = resp.person;
        if (this.roleSelected.id == this.cRole.ADVISOR) {
          const newAdvisorProject = new PersonProject();
          newAdvisorProject.isAdvisor = true;
          newAdvisorProject.active = true;
          newAdvisorProject.person = resp.person;
          !this.editMode && this.addPersonProjects(newAdvisorProject);
        }

        if (this.roleSelected.id == this.cRole.STUDENT) {
          const newStudentProject = new PersonProject();
          newStudentProject.isAdvisor = false;
          newStudentProject.active = true;
          newStudentProject.person = resp.person;
          this.addPersonProjects(newStudentProject);
        }
      }),
    )
  }
}
