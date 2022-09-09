import { Component, Inject, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EStorage } from '@core/enums';
import { RequirementService } from '@core/services';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Requirement } from '@core/models';

@Component({
  selector: 'vs-dialog-project-update-doc',
  templateUrl: './dialog-project-update-doc.component.html',
  styleUrls: ['./dialog-project-update-doc.component.scss']
})
export class DialogProjectUpdateDocComponent implements OnInit {
  subscription: Subscription = new Subscription();
  file: File | null = null;
  loading: boolean = false;
  fileSelected: boolean = false;
  retryUploadFile: boolean = false;
  progressUploadFile: number = 0;
  projectCode: string = '';

  editMode: boolean = false;
  title: string = 'Subir actualizacion';
  btnActionText = 'Subir Actualizacion';
  requirements: Requirement[] = [];


  requirementForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    filename: new FormControl('', Validators.required),
    project: new FormGroup({
      id: new FormControl(0, Validators.required),
    }),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogProjectUpdateDocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { requirement: Requirement, projectId: number},
    private requirementService: RequirementService,
    private storage: AngularFireStorage,
  ) {
   }

  ngOnInit(): void {
    this.verifyEditMode();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  verifyEditMode() {
    (this.requirementForm.controls['project'] as FormGroup).controls['id'].patchValue(this.data.projectId);
    if (this.data.requirement) {
      this.editMode = true;
      this.title = 'Editar documento.';
      this.btnActionText = 'Actualizar documento.' 
       this.requirementForm.patchValue(this.data.requirement);
    }
  }

  handleCreate(){
    this.editMode ? this.update() : this.create();
  }

  create() {
    this.loading = true;
    this.requirementService
    .create(this.requirementForm.value)
    .subscribe((resp) => {
        this.projectCode = resp.code;
        this.file && this.uploadImage();
      });
  }

  update() {
    this.loading = true;
    this.requirementService
    .update(this.requirementForm.value)
    .subscribe((resp) => {
        this.projectCode = resp.code;
        this.file ? this.uploadImage() : this.handleCancel(true);
      });
  }

  handleSelectPhoto(event: any) {
    this.file = event.target.files[0];

    if (!this.file) {
      return;
    }

    this.fileSelected = true;
    this.requirementForm.controls['filename'].patchValue(this.file.name);
  }

  uploadImage() {
    this.progressUploadFile = 0;
    this.loading = true;
    this.retryUploadFile = false;
    const filePath = `${EStorage.REF_REQUIREMENT}/${this.projectCode}`;
    const task = this.storage.upload(filePath, this.file);
    task.snapshotChanges().subscribe({
      next: (resp) => {
        if (resp) {
          this.progressUploadFile =
            (resp?.bytesTransferred / resp?.totalBytes) * 100;
        }
      },
      error: () => {
        this.retryUploadFile = true;
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });

    task.then((resp) => this.handleCancel(true));
  }

  handleCancel(resp: boolean): void {
    this.dialogRef.close(resp);
  }
}
