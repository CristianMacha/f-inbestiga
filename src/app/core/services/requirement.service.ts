import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Requirement } from '../models/requirement.model';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/requirement`;
  }

  create(requirement: Requirement): Observable<Requirement> {
    return this.http.post<Requirement>(`${this.uri}`, requirement);
  }

  update(requirement: Requirement): Observable<Requirement> {
    return this.http.put<Requirement>(`${this.uri}`, requirement);
  }

  getByProject(projectId: number): Observable<Requirement[]> {
    return this.http.get<Requirement[]>(`${this.uri}/project/${projectId}`);
  }
}
