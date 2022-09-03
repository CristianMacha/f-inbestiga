import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {PersonService, ProjectService} from "@core/services";
import {Person, PersonProject, Project} from "@core/models";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {CRole, ERole} from "@core/enums";
import {finalize} from "rxjs";

@Component({
  selector: 'vs-dialog-accept-project',
  templateUrl: './dialog-accept-project.component.html',
  styleUrls: ['./dialog-accept-project.component.scss']
})
export class DialogAcceptProjectComponent implements OnInit {
  project: Project = new Project();
  advisor: Person = new Person();

  requestForm: UntypedFormGroup = new UntypedFormGroup({
    projectId: new UntypedFormControl(0, Validators.required),
    amount: new UntypedFormControl('', Validators.required),
    feesNumber: new UntypedFormControl('', [Validators.required, Validators.min(1)]),
    expirationDate: new UntypedFormControl('', Validators.required),
    advisorId: new UntypedFormControl(0, [Validators.required, Validators.min(1)]),
  });

  searchControl: UntypedFormControl = new UntypedFormControl('', Validators.minLength(7));
  loading: boolean = false;
  cRole = CRole;

  constructor(
    public dialogRef: MatDialogRef<DialogAcceptProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
    private projectService: ProjectService,
    private personService: PersonService,
  ) {
  }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    this.loading = true;
    this.projectService.getProject(this.data.projectId)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.project = resp;
        this.requestForm.controls['projectId'].patchValue(resp.id);
      })
  }

  handleSearchAdvisor(): void {
    this.loading = true;
    this.personService.getByCodeAndRole(this.searchControl.value, ERole.ADVISOR)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.requestForm.controls['advisorId'].patchValue(resp.id);
        this.advisor = resp;
        this.searchControl.reset('');
      });
  }

  handleCloseAdvisor(): void {
    this.requestForm.controls['advisorId'].reset(0);
    this.advisor = new Person();
  }

  acceptProject(): void {
    this.loading = true;
    this.projectService.accept(this.requestForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => this.dialogRef.close(true));
  }

  handleAcceptProject(): void {
    this.requestForm.invalid ? this.requestForm.markAllAsTouched() : this.acceptProject();
  }

  setPerson(person: Person, roleId: number): void {
    this.requestForm.controls['advisorId'].patchValue(person.id);
    this.advisor = person;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
