import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {PersonProject, Project} from '@core/models';
import {PersonProjectService} from "@core/services";

@Component({
  selector: 'vs-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[] = [];
  personsProject: PersonProject[] = [];

  constructor(
    private router: Router,
    private personProjectService: PersonProjectService,
  ) { }

  ngOnInit(): void {
  }

  seeProject(projectId: number) {
    this.router.navigateByUrl(`backoffice/project/${projectId}`);
  }

  getPersonsProject(projectId: number): void {
    console.log('f', projectId)
  }

}
