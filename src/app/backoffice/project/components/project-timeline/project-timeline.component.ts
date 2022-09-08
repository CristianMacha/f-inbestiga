import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Requirement } from '@core/models';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import {
  activeFormRUpdate,
  loadRequirements,
} from '../../store/project.actions';

import { AppStateProjectFeature } from '../../store/project.reducers';
import { projectFeaturePRequirements } from '../../store/project.selectors';
import { EStorage } from '@core/enums';
import { MatDialog } from '@angular/material/dialog';
import { DialogProjectUpdateDocComponent } from 'src/app/shared/dialogs/dialog-project-update-doc/dialog-project-update-doc.component';
import { RequirementService } from '@core/services';

@Component({
  selector: 'vs-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrls: ['./project-timeline.component.scss'],
})
export class ProjectTimelineComponent implements OnInit, OnDestroy {
  @Input() projectId: number = 0;

  subscription: Subscription = new Subscription();
  requirements: Requirement[] = [];

  requirementShowCommentariesId: number = 0;
  fileUrl: string = '';

  constructor(
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private requirementService: RequirementService,
  ) {}

  ngOnInit(): void {
    this.getRequirements();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRequirements() {
    this.requirementService.getByProject(this.projectId)
    .subscribe(resp=>(this.requirements = resp))
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
