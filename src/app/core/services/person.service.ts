import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Person} from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/person`;
  }

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.uri}`);
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
