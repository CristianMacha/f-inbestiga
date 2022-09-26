import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {PersonProject} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class PersonProjectService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/person-project`;
  }

  getByProject(projectId: number): Observable<PersonProject[]> {
    return this.http.get<PersonProject[]>(`${this.uri}/project/${projectId}`);
  }
}
