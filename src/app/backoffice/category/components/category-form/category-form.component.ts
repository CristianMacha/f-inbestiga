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
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@core/services';
import {Category} from '@core/models';

@Component({
  selector: 'vs-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryId:number=0;

  categoryForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    active: new FormControl(true, Validators.required),
  });

  title: string = 'Nueva Categoria';
  btnActionText: string = 'Crear categoria';

  loading$: Observable<boolean> = new Observable();

  editMode: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(resp=>{
      this.categoryId=parseInt(resp['id']);
      if(this.categoryId){
        this.title = 'Actualizar categoria';
        this.btnActionText = 'Actualizar categoria';
        this.checkFormStatus(this.categoryId);
      }
    })
  }

  handleBtnCancel() {
    this.router.navigateByUrl(`backoffice/category`).then();
  }
  
  create() {
    if (this.categoryForm.value.name!="") {
      this.categoryService.create(this.categoryForm.value).subscribe(resp=>{
        this.router.navigateByUrl(`backoffice/category`).then();
      });
    }
  }
  update() {
    if (this.categoryForm.value.name!="") {
      this.categoryService.update(this.categoryForm.value).subscribe(resp=>{
        this.router.navigateByUrl(`backoffice/category`).then();
      });
    }

  }

  checkFormStatus(categoryId: number): void {
    this.categoryService.getCategory(this.categoryId)
    .subscribe((resp)=>{
        this.editMode = true;
        this.categoryForm.patchValue(resp);
        this.categoryForm.markAllAsTouched();
      })
    }
}
