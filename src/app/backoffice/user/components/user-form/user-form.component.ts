import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { finalize, map, Observable, startWith, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';

import { Person, PersonRoles, Role, User } from '@core/models';
import { PersonService } from '@core/services';
import { DialogUserPasswordComponent } from '../../../../shared/dialogs/dialog-user-password/dialog-user-password.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'vs-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  roleCtrl = new FormControl('');

  personRolesSelected: PersonRoles[] = [];
  roles: Role[] = [];

  personForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    fullName: new FormControl('', Validators.required),
    surnames: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(7)]),
    user: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    })
  });

  requirements: User[] = [];
  personId:number=0;
  title: string = 'Nuevo usuario';
  btnActionText: string = 'Crear usuario';

  subscription: Subscription = new Subscription();
  loading: boolean = false;
  editMode: boolean = false;
  person: Person = new Person();

  @ViewChild('roleInput') roleInput!: ElementRef<HTMLInputElement>;
  @ViewChild("chipList") chipList: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private  personService:PersonService,
    private router: Router,
    private dialog: MatDialog,
    private roleServices: RoleService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp=>{
      this.personId=parseInt(resp['id']);
      if(this.personId){
        this.title = 'Actualizar Usuario';
        this.btnActionText = 'Actualizar Usuario';
        this.checkFormStatus(this.personId);
      }
    });
    this.getRoles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRoles(): void {
    this.loading = true;
    this.roleServices.getAll()
      .pipe(finalize(()=> this.loading = false))
      .subscribe((resp) => this.roles = resp);
  }

  handleBtnCancel() {
    this.router.navigateByUrl(`backoffice/user`).then();
  }

  hanldeCreate() {
    this.verifyPersonRoles()
    if(this.personRolesSelected.length == 0) { return }
    this.personForm.invalid ? this.personForm.markAllAsTouched() : this.createUser();
  }

  createUser(): void {
    this.personService.create({...this.personForm.value, personRoles: this.personRolesSelected}).subscribe(resp=>{
      this.router.navigateByUrl(`backoffice/user`).then();
    });
  }

  handleUpdate() {
    this.verifyPersonRoles()
    if(this.personRolesSelected.length == 0) { return }
    this.personForm.invalid ? this.personForm.markAllAsTouched() : this.updateUser();
  }

  updateUser(): void {
    this.personService.update({...this.personForm.value, personRoles: this.personRolesSelected}).subscribe(resp=>{
      this.router.navigateByUrl(`backoffice/user`).then();
    });
  }

  checkFormStatus(personId:number) {
    this.personService.getByUser(personId)
    .subscribe((resp)=>{
      this.editMode = true;
      this.personForm.patchValue(resp);
      (this.personForm.controls['user'] as FormGroup).controls['email'].disable();
      (this.personForm.controls['user'] as FormGroup).controls['password'].disable();
      resp.personRoles.forEach((personRole) => this.personRolesSelected.push(personRole))
    })
  }

  updatePassword(){
    this.dialog.open(DialogUserPasswordComponent, {
      width: '500px',
      data: { personId: this.personId},
      disableClose: true,
    });
  }

  remove(personRole: PersonRoles): void {
    const index = this.personRolesSelected.findIndex((pr) => pr.id == personRole.id);
    if(this.editMode && personRole.id !== 0) {
      this.personRolesSelected[index].active = !this.personRolesSelected[index].active;
    } else {
      if (index >= 0) {
        this.personRolesSelected.splice(index, 1);
        this.verifyPersonRoles();
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const newRole: any = {
      id: event.option.value,
      name: event.option.viewValue,
    };

    const newPersonRole: any = {
      id:0,
      role:newRole,
      active:true,
    };

    const index = this.personRolesSelected.findIndex((personRole) => personRole.role.id == newRole.id);
    if(index < 0) {
      this.personRolesSelected.push(newPersonRole);
      this.verifyPersonRoles();
    }

    this.roleInput.nativeElement.value = '';
    this.roleCtrl.setValue(null);
  }

  verifyPersonRoles(): void {
    if(this.personRolesSelected.length == 0) {
      this.chipList.errorState = true;
    } else {
      this.chipList.errorState = false;
    }
  }
}
