import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { Category, Invoice, Person, PersonProject, Role } from '@core/models';
import { CategoryService, InvoiceService, ProjectService } from '@core/services';
import { CProjectStatus, CRole, ERole } from '@core/enums';
import { Store } from '@ngrx/store';
import { appState } from '../../../../app.reducers';
import { uiRoleSelected } from '../../../../../app/shared/ui.selectors';

@Component({
  selector: 'vs-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  projectForm: UntypedFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(0, Validators.required),
    name: new UntypedFormControl('', Validators.required),
    description: new UntypedFormControl(''),
    startDate: new UntypedFormControl('', Validators.required),
    expirationDate: new UntypedFormControl('', Validators.required),
    personProjects: new UntypedFormArray([], [Validators.required]),
    otherCategory: new UntypedFormControl(''),
    category: new UntypedFormGroup({
      id: new UntypedFormControl(0, [Validators.required, Validators.min(1)]),
      name: new UntypedFormControl(''),
    }),
  });

  categories: Category[] = [];
  loading: boolean = false;
  roleSelected: Role = new Role();
  personAuth: Person = new Person();
  cRole = CRole;
  cProjectStatus = CProjectStatus;
  invoice: Invoice = new Invoice();
  showOtherCategory = false;

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private invoiceService: InvoiceService,
    private categoryService: CategoryService,
    private store: Store<appState>,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(resp => {
      this.getProject(resp['id']);
      this.getInvoice(resp['id']);
    })
    this.getRoleSelected();
    this.getActiveCategories();
    this.valueChangesCategory();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get personProjectsControls() {
    return this.projectForm.controls['personProjects'] as UntypedFormArray;
  }

  handleUpdate(): void {
    this.projectForm.invalid ? this.projectForm.markAllAsTouched() : this.updateProject();
  }

  updateProject(): void {
    this.loading = true;
    this.projectService.update(this.projectForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => this.handleCancel());
  }

  getProject(projectId: number): void {
    this.projectService.getProject(projectId)
      .subscribe((resp) => {
        this.setPersonsProject(resp.personProjects);
        this.projectForm.patchValue(resp);
      })
  }

  setPersonsProject(personsProject: PersonProject[]): void {
    personsProject.map((pp) => this.addPersonProjects(pp));
  }

  getInvoice(projectId: number): void {
    this.invoiceService.getByProject(projectId)
      .subscribe((resp) => this.invoice = resp[0])
  }

  addPersonProjects(personProject: PersonProject) {
    const existPerson = (this.personProjectsControls.value as Array<PersonProject>).some((pp) => pp.person.id == personProject.person.id);
    if (existPerson) {
      return;
    }

    const personProjectControl = this.formBuilder.group({
      id: new UntypedFormControl(personProject.id),
      isAdvisor: new UntypedFormControl(personProject.isAdvisor),
      active: new UntypedFormControl(personProject.active),
      person: new UntypedFormGroup({
        id: new UntypedFormControl(personProject.person.id),
        fullName: new UntypedFormControl(personProject.person.fullName),
        surnames: new UntypedFormControl(personProject.person.surnames),
      }),
    });

    this.personProjectsControls.push(personProjectControl);
  }

  removePersonProject(index: number, personProject: AbstractControl) {
    let personProjectGroup = personProject as FormGroup;
    if(personProjectGroup.controls['id'].value > 0) {
      personProjectGroup.controls['active'].patchValue(false);
    } else {
      this.personProjectsControls.removeAt(index);
    }
  }

  restorePersonProject(personProjectIndex: number) {
    (
      this.personProjectsControls.controls[personProjectIndex] as UntypedFormGroup
    ).controls['active'].patchValue(true);
  }

  setPerson(person: Person, roleId: number): void {
    let isAdvisor: boolean = false;
    if (roleId === ERole.ADVISOR) {
      isAdvisor = true;
    }
    if (roleId === ERole.STUDENT) {
      isAdvisor = false;
    }

    const newPersonProject = new PersonProject();
    newPersonProject.isAdvisor = isAdvisor;
    newPersonProject.person = person;
    this.addPersonProjects(newPersonProject);
  }

  valueChangesCategory(): void {
    const categoryControl = (this.projectForm.controls['category'] as UntypedFormGroup).controls['id'];
    categoryControl.valueChanges.subscribe((id) => {
      if (id == 9) {
        this.showOtherCategory = true;
      } else {
        this.showOtherCategory = false;
      }
    });
  }

  handleCloseOtherCategory(): void {
    this.showOtherCategory = false;
    (this.projectForm.controls['category'] as UntypedFormGroup).controls['id'].patchValue(0);
    this.projectForm.controls['otherCategory'].reset('');
  }

  getActiveCategories(): void {
    this.loading = true;
    this.categoryService
      .getActiveCategories()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((resp) => (this.categories = resp));
  }

  getRoleSelected(): void {
    this.subscription.add(
      this.store.select(uiRoleSelected).subscribe((role) => {
        if (role.id) { this.roleSelected = role }
      })
    )
  }

  handleCancel(): void {
    this.router.navigateByUrl('backoffice/project');
  }

  handleEditInvoice(): void {
    this.router.navigateByUrl(`backoffice/pagos/${this.invoice.id}`);
  }
}
