import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {PersonProject, Project} from "@core/models";
import {PersonProjectService} from "@core/services";
import {CProjectStatus} from "@core/enums";

@Component({
  selector: 'vs-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project = new Project();

  personsProject: PersonProject[] = [];
  cProjectStatus = CProjectStatus;

  constructor(
    private router: Router,
    private personsProjectService: PersonProjectService,
  ) { }

  ngOnInit(): void {
    this.getPersonsProject();
  }

  getPersonsProject() {
    this.personsProjectService.getByProject(this.project.id)
      .subscribe((resp) => this.personsProject = resp);
  }

  seeProject(): void {
    this.router.navigateByUrl(`backoffice/project/${this.project.id}`)
  }
}
