import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Project, Requirement } from '@core/models';
import { Subscription } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { DialogProjectUpdateDocComponent } from '../../../../shared/dialogs/dialog-project-update-doc/dialog-project-update-doc.component';
import { ProjectService, RequirementService } from '@core/services';
import { CProjectStatus, EStorage } from '@core/enums';
import { MatDialog } from '@angular/material/dialog';


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
  status: string="";
  constructor(
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private requirementService: RequirementService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.getRequirements();
    this.getProject();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getRequirements() {
    this.requirementService.getByProject(this.projectId)
    .subscribe(resp=>{this.requirements = resp})
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
      const dialogRef = this.dialog.open(DialogProjectUpdateDocComponent, {
      width: '500px',
      data: {requirement:requirement, projectId: this.projectId},
      disableClose:true,
    });
    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.getRequirements())
    )
  }

  handleUploadUpdate() {
    const dialogRef = this.dialog.open(DialogProjectUpdateDocComponent, {
      width: '500px',
      data: {requirement: null, projectId: this.projectId},
      disableClose:true,
    });
    this.subscription.add(
      dialogRef.afterClosed().subscribe((resp) => resp && this.getRequirements())
    )
  }
  getProject(): void {
    this.projectService.getProject(this.projectId, false)
      .subscribe((resp) => (this.status=resp.status))
  }
}
