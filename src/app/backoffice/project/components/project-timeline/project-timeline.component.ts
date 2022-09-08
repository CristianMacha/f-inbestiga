import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Project, Requirement } from '@core/models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import {
  activeFormR,
  activeFormRUpdate,
  loadRequirements,
} from '../../store/project.actions';

import { AppStateProjectFeature } from '../../store/project.reducers';
import { projectFeaturePRequirements } from '../../store/project.selectors';
import { CProjectStatus, EStorage } from '@core/enums';
import { MatDialog } from '@angular/material/dialog';
import { DialogProjectUpdateDocComponent } from 'src/app/shared/dialogs/dialog-project-update-doc/dialog-project-update-doc.component';

@Component({
  selector: 'vs-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss'],
})
export class ProjectTimelineComponent implements OnInit, OnDestroy {
  @Input() projectId: number = 0;

  subscription: Subscription = new Subscription();
  requirements: Requirement[] = [];
  project: Project = new Project();
  cProjectStatus = CProjectStatus;
  requirementShowCommentariesId: number = 0;
  fileUrl: string = '';
  person: any;

  constructor(
    private store: Store<AppStateProjectFeature>,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadRequirements({ projectId: this.projectId }));
    this.getRequirements();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRequirements() {
    this.subscription.add(
      this.store
        .select(projectFeaturePRequirements)
        .subscribe((resp) => (this.requirements = resp))
    );
  }

  handleViewCommentaries(requirementId: number) {
    this.requirementShowCommentariesId = requirementId;
  }

  getUrl(fileCode: string) {
    const ref = this.storage.ref(`${EStorage.REF_REQUIREMENT}/${fileCode}`);
    this.subscription.add(
      ref.getDownloadURL().subscribe({
        next: (url) => (this.fileUrl = url),
        complete: () => window.open(this.fileUrl, '_blank'),
      })
    );
  }

  handleEditRequirement(requirement: Requirement) {
    window.scroll(0, 0);
    this.store.dispatch(activeFormRUpdate({ requirement }));
  }
  handleUploadUpdate() {
    const dialogRef = this.dialog.open(DialogProjectUpdateDocComponent, {
      width: '500px',
      data: {projectId:this.projectId}
    });
    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => console.log(resp))
    )
    //this.store.dispatch(activeFormR({active: true}));
  }
}
