import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Person } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/person`;
  }

  public getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.uri}`);
  }

  public create(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.uri}`, person);
  }
}
