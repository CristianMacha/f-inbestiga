import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {ProjectAcceptInterface, ProjectInterfaceFilter, ResponseListInterface} from "@core/interfaces";
import {Project} from "@core/models";

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

  getProjects(roleId: number, filter?: ProjectInterfaceFilter): Observable<ResponseListInterface<Project[]>> {
    return this.http.get<ResponseListInterface<Project[]>>(`${this.uri}/role/${roleId}?status=${filter?.status}&take=${filter?.take}&skip=${filter?.skip}`);
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

  updateArchived(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.uri}/update/archived/${projectId}`);
  }

  updateDeleted(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.uri}/update/deleted/${projectId}`);
  }

  updateProgress(projectId: number, progress: number): Observable<Project> {
    return this.http.patch<Project>(`${this.uri}/progress/${projectId}`, {progress});
  }
}
