import { Component, Input, OnInit } from '@angular/core';

import { CommentaryService } from '@core/services';
import { Commentary, Project, Requirement } from '@core/models';

@Component({
  selector: 'vs-project-comments',
  templateUrl: './project-comments.component.html',
  styleUrls: ['./project-comments.component.scss'],
})
export class ProjectCommentsComponent implements OnInit {
  @Input() projectId: number = 0;
  @Input() requirementId: number = 0;

  commentaries: Commentary[] = [];

  constructor(private commentaryService: CommentaryService) {}

  ngOnInit(): void {
    this.getComentaryByType();
  }

  createProject(commentary: any) {
    this.commentaryService
      .create(commentary)
      .subscribe((resp) => this.getComentaryByType());
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

  getComentaryByType() {
    this.projectId && this.getProjectCommentaries(this.projectId);
    this.requirementId && this.getProjectCommentaries(this.requirementId);
  }

  handleCreate() {
    const newCommentary = new Commentary();
    newCommentary.content = 'test';

    if (this.projectId) {
      const newProject = new Project();
      newProject.id = this.projectId;
      newCommentary.project = newProject;

      const { requirement, ...commentary } = newCommentary;
      console.log(commentary);

      this.createProject(commentary);
    }

    if (this.requirementId) {
      const newRequirement = new Requirement();
      newRequirement.id = this.requirementId;
      newCommentary.requirement = newRequirement;

      const { project } = newCommentary;
      // this.createProject(newCommentary);
    }
  }
}
