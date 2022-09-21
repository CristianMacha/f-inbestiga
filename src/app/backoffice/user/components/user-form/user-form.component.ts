import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Person, User } from '@core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService, RequirementService } from '@core/services';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserPasswordComponent } from 'src/app/shared/dialogs/dialog-user-password/dialog-user-password.component';

@Component({
  selector: 'vs-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  personForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    fullName: new FormControl('', Validators.required),
    surnames: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(7)]),
    user: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    }),
    personRoles: new FormArray([
      new FormGroup({
        id: new FormControl(0, Validators.required),
        role: new FormGroup({
          id: new FormControl(0, [Validators.required, Validators.min(1)])
        })
      })
    ], Validators.required)
  });

  requirements: User[] = [];
  personId:number=0;
  title: string = 'Nuevo usuario';
  btnActionText: string = 'Crear usuario';

  subscription: Subscription = new Subscription();
  loading: boolean = false;
  editMode: boolean = false;
  person: Person = new Person();

  constructor(
    private activatedRoute: ActivatedRoute,
    private  personService:PersonService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp=>{
      this.personId=parseInt(resp['id']);
      if(this.personId){
        this.title = 'Actualizar Usuario';
        this.btnActionText = 'Actualizar Usuario';
        this.checkFormStatus(this.personId);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get rolesForm() {
    return this.personForm.controls['personRoles'] as FormArray
  }

  handleBtnCancel() {
    this.router.navigateByUrl(`backoffice/user`).then();
  }
  create() {
    if (this.personForm.value.name!="") {
      this.personService.create(this.personForm.value).subscribe(resp=>{
        this.router.navigateByUrl(`backoffice/user`).then();
      });
    }
  }
  update() {
    if (this.personForm.value.name!="") {
      this.personService.update(this.personForm.value).subscribe(resp=>{
        this.router.navigateByUrl(`backoffice/user`).then();
      });
    }
  }

  checkFormStatus(personId:number) {
    this.personService.getByUser(personId)
    .subscribe((resp)=>{
      this.editMode = true;
      this.personForm.patchValue(resp);
      (this.personForm.controls['user'] as FormGroup).controls['email'].disable();
      (this.personForm.controls['user'] as FormGroup).controls['password'].disable();
    })
  }

  updatePassword(){
    this.dialog.open(DialogUserPasswordComponent, {
      width: '500px',
      data: { personId: this.personId},
      disableClose: true,
    });
  }

}
