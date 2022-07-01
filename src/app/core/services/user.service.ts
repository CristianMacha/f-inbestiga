import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uri: string;

  constructor(private http: HttpClient) { 
    this.uri = `${environment.url}/user`;
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.uri}`);
  }
}
