import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {PersonService, ProjectService} from "@core/services";
import {Fee, Person, PersonProject, Project} from "@core/models";
import {FormBuilder, FormControl, FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {CRole, ERole} from "@core/enums";
import {finalize} from "rxjs";
import * as moment from 'moment';

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
    feesNumber: new UntypedFormControl(1, [Validators.required, Validators.min(1)]),
    startDate: new UntypedFormControl('', Validators.required),
    expirationDate: new UntypedFormControl('', Validators.required),
    advisorId: new UntypedFormControl(0, [Validators.required, Validators.min(1)]),
  });

  feeForm = new UntypedFormGroup({
    fees: new UntypedFormArray([])
  });

  searchControl: UntypedFormControl = new UntypedFormControl('', Validators.minLength(7));
  loading: boolean = false;
  cRole = CRole;

  constructor(
    public dialogRef: MatDialogRef<DialogAcceptProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: number },
    private projectService: ProjectService,
    private personService: PersonService,
    private builder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getProject();
    this.valueChangeAmount();
    this.valueChangeFeesNumber();
  }

  get feesFormArray(): UntypedFormArray {
    return this.feeForm.controls['fees'] as UntypedFormArray;
  }

  getProject(): void {
    this.loading = true;
    this.projectService.getProject(this.data.projectId, false)
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
    this.projectService.accept({fees: this.feeForm.controls['fees'].value, ...this.requestForm.value})
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

  valueChangeAmount(): void {
    this.requestForm.controls['amount'].valueChanges.subscribe((resp) => this.calculateFee(resp, this.requestForm.controls['feesNumber'].value))
  }

  valueChangeFeesNumber(): void {
    this.requestForm.controls['feesNumber'].valueChanges.subscribe((resp) => this.calculateFee(this.requestForm.controls['amount'].value, resp));
  }

  private calculateFee(invoiceTotal: number, feesNumber: number): void {
    this.feesFormArray.clear();
    const totalFee = invoiceTotal / feesNumber;
    const newFee = new Fee();
    newFee.total = Math.round(totalFee);

    const currentDate = moment();
    for (let index = 0; index < feesNumber; index++) {
      newFee.paymentDate = currentDate.clone().add(index, 'month').toDate();
      this.feesFormArray.push(this.createFeeForm(newFee));
    }
  }


  createFeeForm(feeValue?: Fee): FormGroup {
    const fee = this.builder.group({
      id: new FormControl((feeValue?.id || 0)),
      total: new UntypedFormControl((feeValue?.total || ''), Validators.required),
      paymentDate: new UntypedFormControl((feeValue?.paymentDate || ''), [Validators.required]),
      active: new FormControl((feeValue?.active || true))
    });

    return fee;
  }

}
