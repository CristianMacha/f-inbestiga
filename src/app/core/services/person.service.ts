import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Person} from '@core/models';
import {ResponseListInterface} from "../interfaces/response.interface";
import {PersonFilterInterface} from "@core/interfaces";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/person`;
  }

  public getPersonByNameAndRole(name: string, roleId: number): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.uri}/name_and_role?name=${name}&roleId=${roleId}`);
  }

  public getPersons(filter: PersonFilterInterface): Observable<ResponseListInterface<Person[]>> {
    return this.http.get<ResponseListInterface<Person[]>>(`${this.uri}?roleId=${filter.roleId}&take=${filter.take}&skip=${filter.skip}`);
  }

  public create(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.uri}`, person);
  }

  public update(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.uri}`, person);
  }

  public getByCodeAndRole(code: string, roleId: number): Observable<Person> {
    return this.http.get<Person>(`${this.uri}/find/members?code=${code}&roleId=${roleId}`);
  }

  public getByUser(userId: number): Observable<Person> {
    return this.http.get<Person>(`${this.uri}/user/${userId}`);
  }
}
