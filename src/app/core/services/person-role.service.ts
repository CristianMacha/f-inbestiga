import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {PersonRoles} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class PersonRoleService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/person-role`;
  }

  getByPerson(): Observable<PersonRoles[]> {
    return this.http.get<PersonRoles[]>(`${this.uri}/person`);
  }
}
