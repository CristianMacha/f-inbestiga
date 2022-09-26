import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '@core/models';

import {MatPaginator} from "@angular/material/paginator";
import {CategoryService} from "@core/services";
import {MatTableDataSource} from "@angular/material/table";
import {Store} from "@ngrx/store";
import {AppStateCategoryFeature} from "../../store/category.reducer";
import {activeFormUpdate} from "../../store/category.actions";
import { Router } from '@angular/router';

@Component({
  selector: 'vs-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.scss'],
})
export class CategoryTableComponent implements OnInit {
  categories$: Observable<Category[]> = new Observable();

  dataSource = new MatTableDataSource<Category>([]);
  displayedColumns: string[] = ['name', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<AppStateCategoryFeature>,
    private categoryService: CategoryService,
    private router: Router,

  ) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((resp) => {
        this.dataSource.data = resp;
        this.dataSource.paginator = this.paginator;
      });
  }

  handleBtnEdit(categoryId: number) {
    this.router.navigateByUrl(`backoffice/category/${categoryId}`).then();
  }
}