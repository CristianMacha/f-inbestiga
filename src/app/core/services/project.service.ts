import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/project`;
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.uri}`);
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

}