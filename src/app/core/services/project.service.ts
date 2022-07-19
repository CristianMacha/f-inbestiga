import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Project} from '../models/project.model';
import {ProjectInterfaceFilter} from "@core/interfaces";

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/project`;
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.uri}/${projectId}`);
  }

  getProjects(roleId: number, filter?: ProjectInterfaceFilter): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.uri}/role/${roleId}?status=${filter?.status}`);
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
