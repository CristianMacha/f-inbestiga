import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare function loadInputs(): any;

import { AppStateCategoryFeature } from '../../store/category.reducer';
import {
  activeForm,
  createCategory,
  updateCategory,
} from '../../store/category.actions';
import {
  categoryFeature,
  categoryFeatureLoading,
} from '../../store/category.selectors';

@Component({
  selector: 'vs-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    active: new FormControl('', Validators.required),
    createdAt: new FormControl('', Validators.required),
    updatedAt: new FormControl('', Validators.requiredTrue),
  });

  title: string = 'Nueva Categoria';
  btnActionText: string = 'Crear categoria';

  subcription: Subscription = new Subscription();
  loading$: Observable<boolean> = new Observable();

  editMode: boolean = false;

  constructor(private store: Store<AppStateCategoryFeature>) {}

  ngOnInit(): void {
    loadInputs();
    this.loading$ = this.store.select(categoryFeatureLoading);
    this.checkFormStatus();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  handleBtnCancel() {
    this.store.dispatch(activeForm({ active: false }));
  }

  handleBtnActionCategory() {
    if (this.editMode) {
      this.categoryForm.invalid
        ? this.categoryForm.markAllAsTouched()
        : this.store.dispatch(
            updateCategory({ category: this.categoryForm.value })
          );
    } else {
      this.categoryForm.invalid
        ? this.categoryForm.markAllAsTouched()
        : this.store.dispatch(
            createCategory({ category: this.categoryForm.value })
          );
    }
  }

  checkFormStatus() {
    this.subcription.add(
      this.store.select(categoryFeature).subscribe((resp) => {
        if (resp.editMode) {
          (this.categoryForm.controls['category'] as FormGroup).controls[
            'id'
          ].disable();
          this.editMode = true;
          this.title = 'Actualizar categoria';
          this.btnActionText = 'Actualizar categoria';
          this.categoryForm.patchValue(resp.category);
          this.categoryForm.markAllAsTouched();
        }
      })
    );
  }
}
