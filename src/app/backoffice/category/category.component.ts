import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { activeForm, loadCategories } from './store/category.actions';
import { AppStateCategoryFeature } from './store/category.reducer';
import { categoryFeatureActiveForm } from './store/category.selectors';

@Component({
  selector: 'vs-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  
  activeForm$: Observable<boolean> = new Observable();

  constructor(
    private store: Store<AppStateCategoryFeature>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activeForm$ = this.store.select(categoryFeatureActiveForm);
    this.store.dispatch(loadCategories());
  }

  handleBtnNewCategory(): void {
    this.router.navigateByUrl(`backoffice/category/new`).then();

  }

}
