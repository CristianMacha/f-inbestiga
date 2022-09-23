import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {Role} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/role`;
  }

  getOne(roleId: number): Observable<Role> {
    return this.http.get<Role>(`${this.uri}/${roleId}`);
  }
}
