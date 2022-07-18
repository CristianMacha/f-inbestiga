import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppStateUserFeature } from '../../store/user.reducer';
import { activeDetails, activeForm, createPerson, updatePerson } from '../../store/user.actions';
import { userFeature, userFeatureLoading } from '../../store/user.selectors';
import { Person } from '@core/models';

declare function loadInputs(): any;

@Component({
  selector: 'vs-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  personForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    fullname: new FormControl('', Validators.required),
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

  title: string = 'Nuevo usuario';
  btnActionText: string = 'Crear usuario';

  subscription: Subscription = new Subscription();
  loading: boolean = false;

  editMode: boolean = false;
  fromDetail: boolean = false;
  personSelected: boolean = false;
  person: Person = new Person();

  constructor(
    private store: Store<AppStateUserFeature>,
  ) { }

  ngOnInit(): void {
    loadInputs();
    this.checkFormStatus();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get rolesForm() {
    return this.personForm.controls['personRoles'] as FormArray
  }

  handleBtnCancel() {
    this.personSelected ? this.store.dispatch(activeDetails({ person: this.person })) : this.store.dispatch(activeForm({ active: false }));
  }

  handleBtnActionUser() {
    if (this.editMode) {
      this.personForm.invalid ? this.personForm.markAllAsTouched() : this.store.dispatch(updatePerson({ person: this.personForm.value }));
    } else {
      this.personForm.invalid ? this.personForm.markAllAsTouched() : this.store.dispatch(createPerson({ person: this.personForm.value }));
    }
  }

  checkFormStatus() {
    this.subscription.add(
      this.store.select(userFeature).subscribe(
        (resp) => {
          this.loading = resp.loading;
          if (resp.editMode) {
            (this.personForm.controls['user'] as FormGroup).controls['email'].disable();
            (this.personForm.controls['user'] as FormGroup).controls['password'].disable();
            this.editMode = true;
            this.fromDetail = resp.details;
            this.personSelected = resp.personSelected;
            this.title = 'Actualizar usuario';
            this.btnActionText = 'Actualizar usuario';
            this.person= resp.person;
            this.personForm.patchValue(this.person);
            this.personForm.markAllAsTouched();
          }
        })
    )
  }

}
