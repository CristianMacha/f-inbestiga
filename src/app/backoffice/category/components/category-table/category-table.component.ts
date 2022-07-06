import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '@core/models';

import { AppStateCategoryFeature } from '../../store/category.reducer';
import { categoriesFeature } from '../../store/category.selectors';
import { activeFormUpdate, loadCategories } from '../../store/category.actions';

@Component({
  selector: 'vs-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit {
  categories$: Observable<Category[]> = new Observable();

  constructor(private store: Store<AppStateCategoryFeature>) {}

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.select(categoriesFeature);
  }

  handleBtnEdit(category: Category) {
    this.store.dispatch(activeFormUpdate({ category }));
  }
}
