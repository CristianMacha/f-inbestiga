import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {ResourceModel} from "@core/models";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private readonly uri: string;
  public resources: ResourceModel[] = [];

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/resource`;
  }

  getAllByRoleId(roleId: number): Observable<ResourceModel[]> {
    return this.http.get<ResourceModel[]>(`${this.uri}/role/${roleId}`);
  }

  setResources(resources: ResourceModel[]) {
    this.resources = resources;
  }
}
