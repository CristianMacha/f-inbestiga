import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '@core/models';

@Component({
  selector: 'vs-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  seeProject(projectId: number) {
    this.router.navigateByUrl(`backoffice/project/${projectId}`);
  }

}
