import { Component, Input, OnInit } from '@angular/core';
import { ProjectService, RequirementService } from '@core/services';
import { Store } from '@ngrx/store';
import { loadRequirements } from '../../store/project.actions';
import { AppStateProjectFeature } from '../../store/project.reducers';
import { Project, Requirement } from '@core/models';
import { Subscription } from 'rxjs';
import { projectFeaturePRequirements } from '../../store/project.selectors';
import { EStorage } from '@core/enums';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'vs-project-document',
  templateUrl: './project-document.component.html',
  styleUrls: ['./project-document.component.scss']
})
export class ProjectDocumentComponent implements OnInit {
  @Input() projectId: number = 0;

  fileUrl: string = ''; 
  requirements: Requirement[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    private requirementService: RequirementService,
    ) { }

  ngOnInit(): void {
    this.getRequirements();
  }

  getRequirements() {
    this.requirementService.getByProject(this.projectId)
    .subscribe(resp=>(this.requirements = resp))
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
}
