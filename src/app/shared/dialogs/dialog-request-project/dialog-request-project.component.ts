import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {CategoryService, ProjectService, SnackBarService} from "@core/services";
import {Category} from "@core/models";
import {finalize} from "rxjs";

@Component({
  selector: 'vs-request-project',
  templateUrl: './dialog-request-project.component.html',
  styleUrls: ['./dialog-request-project.component.scss']
})
export class DialogRequestProjectComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormGroup({
      id: new FormControl(0, [Validators.required, Validators.min(1)])
    }),
  });

  categories: Category[] = [];
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogRequestProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { personId: number },
    private categoryService: CategoryService,
    private projectService: ProjectService,
    private snackBar: SnackBarService,
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((resp) => this.categories = resp);
  }

  handleRequest(): void {
    this.projectForm.invalid ? this.projectForm.markAllAsTouched() : this.request();
  }

  request(): void {
    this.loading = true;
    this.projectService.request(this.projectForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe((resp) => {
        this.snackBar.openTopEnd('Solicitud enviada.');
        this.dialogRef.close(true);
      })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
