import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ILogin, ILoginResponse } from '@core/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uri: string;

  constructor(
    private http: HttpClient,
  ) {
    this.uri = `${environment.url}/auth`;
   }

  login(login: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.uri}/signin`, login);
  }
}
