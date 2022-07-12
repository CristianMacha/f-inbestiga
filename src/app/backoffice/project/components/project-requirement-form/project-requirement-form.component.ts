import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { RequirementService } from '@core/services';
import { AppStateProjectFeature } from '../../store/project.reducers';
import { activeFormR, loadRequirements } from '../../store/project.actions';
import { EStorage } from '@core/enums';
import { Subscription } from 'rxjs';
import { projectFeature } from '../../store/project.selectors';

@Component({
  selector: 'vs-project-requirement-form',
  templateUrl: './project-requirement-form.component.html',
  styleUrls: ['./project-requirement-form.component.scss'],
})
export class ProjectRequirementFormComponent implements OnInit, OnDestroy {
  @Input() projectId: number = 0;

  subscription: Subscription = new Subscription();

  file: File | null = null;
  loading: boolean = false;
  fileSelected: boolean = false;
  retryUploadFile: boolean = false;
  fileUploaded: boolean = false;
  progressUploadFile: number = 0;
  filename: string = '';

  editMode: boolean = true;
  title: string = 'Subir actualizacion';
  btnActionText = 'Subir Actualizacion';

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
    private requirementService: RequirementService,
    private store: Store<AppStateProjectFeature>,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getEditModeState();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleCreate() {
    (this.requirementForm.controls['project'] as FormGroup).controls[
      'id'
    ].patchValue(this.projectId);

    this.editMode ? this.update() : this.create();
  }

  create() {
    this.requirementService
      .create(this.requirementForm.value)
      .subscribe((resp) => {
        this.filename = resp.filename;
        this.upploadImage();
        this.store.dispatch(loadRequirements({ projectId: resp.project.id }));
      });
  }

  update() {
    this.requirementService
      .update(this.requirementForm.value)
      .subscribe((resp) => {
        this.filename = resp.filename;
        this.file && this.upploadImage();
        this.store.dispatch(loadRequirements({ projectId: resp.project.id }));
        this.handleCancel();
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

  upploadImage() {
    this.progressUploadFile = 0;
    this.loading = true;
    this.retryUploadFile = false;
    console.log('xd');


    const filePath = `${EStorage.REF_REQUIREMENT}/${this.filename}`;
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

    task.then((resp) => this.handleCancel());
  }

  getEditModeState() {
    this.subscription.add(
      this.store.select(projectFeature).subscribe((resp) => {
        this.loading = resp.loading;
        if (resp.editModeR) {
          this.editMode = true;
          this.title = 'Actualizar';
          this.btnActionText = 'Actualizar';
          this.fileSelected = true;
          this.requirementForm.patchValue(resp.requirement);
        }
      })
    );
  }

  handleCancel(): void {
    // this.file = null;
    // const requirement = new Requirement()
    // this.requirementForm.reset(requirement);
    // this.progressUploadFile = 0;
    this.store.dispatch(activeFormR({ active: false }));
  }
}
