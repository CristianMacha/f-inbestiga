import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Commentary } from '../models/commentary.model';

@Injectable({
  providedIn: 'root',
})
export class CommentaryService {
  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/commentary`;
  }

  create(commentary: Commentary): Observable<Commentary> {
    return this.http.post<Commentary>(`${this.uri}`, commentary);
  }

  getCommentariesByProject(projectId: number): Observable<Commentary[]> {
    return this.http.get<Commentary[]>(`${this.uri}/project/${projectId}`);
  }

  getCommentariesByRequirement(
    requirementId: number
  ): Observable<Commentary[]> {
    return this.http.get<Commentary[]>(
      `${this.uri}/requirement/${requirementId}`
    );
  }
}
