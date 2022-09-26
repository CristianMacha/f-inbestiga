import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormArray, FormControl, FormGroup, UntypedFormGroup, Validators} from "@angular/forms";
import {PersonService} from "@core/services";
import {Person} from "@core/models";
import {ERole} from "@core/enums";
import {finalize} from "rxjs";

@Component({
  selector: 'vs-dialog-person-form',
  templateUrl: './dialog-person-form.component.html',
  styleUrls: ['./dialog-person-form.component.scss']
})
export class DialogPersonFormComponent implements OnInit {
  roleName: 'estudiante' | 'asesor' = 'estudiante';
  loading: boolean = false;

  personForm: FormGroup = new UntypedFormGroup({
    fullname: new FormControl('', Validators.required),
    surnames: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(9)]),
    user: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }),
    personRoles: new FormArray([
      new FormGroup({
        role: new FormGroup({
          id: new FormControl(this.data.roleId, [Validators.required, Validators.min(1)]),
        })
      })
    ], Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<DialogPersonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roleId: ERole },
    private personService: PersonService,
  ) {
    if (this.data.roleId === ERole.ADVISOR) {
      this.roleName = 'asesor'
    }
  }

  ngOnInit(): void {
  }

  get rolesForm() {
    return this.personForm.controls['personRoles'] as FormArray
  }

  handleCreatePerson(): void {
    this.personForm.invalid ? this.personForm.markAllAsTouched() : this.createPerson();
  }

  createPerson(): void {
    this.loading = true;
    this.personService.create(this.personForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => this.sendAndCLose(resp))
  }

  sendAndCLose(person: Person): void {
    this.dialogRef.close(person);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
