import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Project} from '../models/project.model';
import {ProjectAcceptInterface, ProjectInterfaceFilter, ProjectResponseInterface} from "@core/interfaces";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/project`;
  }

  accept(acceptProject: ProjectAcceptInterface): Observable<Project> {
    return this.http.post<Project>(`${this.uri}/accept`, acceptProject);
  }

  refuse(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.uri}/refused/${projectId}`);
  }

  request(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.uri}/request`, project);
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.uri}/${projectId}`);
  }

  getProjects(roleId: number, filter?: ProjectInterfaceFilter): Observable<ProjectResponseInterface> {
    return this.http.get<ProjectResponseInterface>(`${this.uri}/role/${roleId}?status=${filter?.status}&take=${filter?.take}&skip=${filter?.skip}`);
  }

  create(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.uri}`, project);
  }

  update(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.uri}`, project);
  }

  getByPerson(personId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.uri}/person/${personId}`);
  }

  updateActive(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.uri}/update/active/${projectId}`);
  }

  updateProgress(projectId: number, progress: number): Observable<Project> {
    return this.http.patch<Project>(`${this.uri}/progress/${projectId}`, {progress});
  }
}
