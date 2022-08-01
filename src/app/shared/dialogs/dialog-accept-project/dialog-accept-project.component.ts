import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {PersonService, ProjectService} from "@core/services";
import {Person, Project} from "@core/models";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ERole} from "@core/enums";
import {finalize} from "rxjs";

@Component({
  selector: 'vs-dialog-accept-project',
  templateUrl: './dialog-accept-project.component.html',
  styleUrls: ['./dialog-accept-project.component.scss']
})
export class DialogAcceptProjectComponent implements OnInit {
  project: Project = new Project();
  advisor: Person = new Person();

  requestForm: FormGroup = new FormGroup({
    projectId: new FormControl(0, Validators.required),
    amount: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required),
    advisorId: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  searchControl: FormControl = new FormControl('', Validators.minLength(7));
  loading: boolean = false;

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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
