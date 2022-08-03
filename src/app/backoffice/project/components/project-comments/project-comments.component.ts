import {Component, Input, OnInit} from '@angular/core';

import {CommentaryService} from '@core/services';
import {Commentary, Project, Requirement} from '@core/models';
import {FormControl, Validators} from '@angular/forms';
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";

import {AppStateProjectFeature} from "../../store/project.reducers";
import {projectFeatureProject} from "../../store/project.selectors";
import {CProjectStatus} from "@core/enums";

@Component({
  selector: 'vs-project-comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.scss'],
})
export class ProjectCommentsComponent implements OnInit {
  @Input() projectId: number = 0;
  @Input() requirementId: number = 0;

  subscription: Subscription = new Subscription();
  commentaries: Commentary[] = [];
  commentaryControl: FormControl = new FormControl('', Validators.required);
  project: Project = new Project();
  cProjectStatus = CProjectStatus;

  constructor(
    private commentaryService: CommentaryService,
    private store: Store<AppStateProjectFeature>
  ) {
  }

  ngOnInit(): void {
    this.getCommentaryByType();
    this.getProject();
  }

  createCommentary(commentary: any) {
    this.commentaryService
      .create(commentary)
      .subscribe((resp) => {
        this.commentaryControl.reset('');
        this.getCommentaryByType();
      });
  }

  getProjectCommentaries(projectId: number) {
    this.commentaryService
      .getCommentariesByProject(projectId)
      .subscribe((resp) => (this.commentaries = resp));
  }

  getRequirementCommentaries(requirementId: number) {
    this.commentaryService
      .getCommentariesByRequirement(requirementId)
      .subscribe((resp) => (this.commentaries = resp));
  }

  getCommentaryByType() {
    this.projectId && this.getProjectCommentaries(this.projectId);
    this.requirementId && this.getRequirementCommentaries(this.requirementId);
  }

  handleCreate() {
    if (!this.commentaryControl.invalid) {
      const newCommentary = new Commentary();
      newCommentary.active = true;
      newCommentary.content = this.commentaryControl.value;

      if (this.projectId) {
        const newProject = new Project();
        newProject.id = this.projectId;
        newCommentary.project = newProject;

        const {requirement, ...commentary} = newCommentary;
        this.createCommentary(commentary);
      }

      if (this.requirementId) {
        const newRequirement = new Requirement();
        newRequirement.id = this.requirementId;
        newCommentary.requirement = newRequirement;

        const {project, ...commentary} = newCommentary;
        this.createCommentary(commentary);
      }
    } else {
      this.commentaryControl.markAsTouched();
    }
  }

  getProject() {
    this.subscription.add(
      this.store.select(projectFeatureProject).subscribe((resp) => {
        this.project = resp;
        (this.project.status === this.cProjectStatus.REQUIRED) ? this.commentaryControl.disable() : this.commentaryControl.enable();
      })
    );
  }
}
