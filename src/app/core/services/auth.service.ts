import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {map, Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {ILogin, ILoginResponse} from '@core/interfaces';
import {HttpClient} from '@angular/common/http';
import {ResourceModel, User} from "@core/models";
import {appState} from "../../app.reducers";
import {setUser} from "../../shared/ui.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = new User();
  resources: ResourceModel[] = [];

  private readonly uri: string;

  constructor(
    private http: HttpClient,
    private store: Store<appState>,
    private router: Router,
  ) {
    this.uri = `${environment.url}/auth`;
  }

  login(login: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.uri}/signing`, login);
  }

  refreshToken(): Observable<boolean> {
    return this.http.get<ILoginResponse>(`${this.uri}/refresh-token/role/${localStorage.getItem('rId')}`)
      .pipe(
        map((resp) => {
          this.user = resp.userDb;
          this.store.dispatch(setUser({user: this.user}));
          this.setToken(resp.token);
          if (resp.resources) {
            this.resources = resp.resources;
          }
          return true;
        })
      )
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setLogin(loginResponse: ILoginResponse): void {
    this.user = loginResponse.userDb;
    this.store.dispatch(setUser({user: this.user}));
    this.setToken(loginResponse.token);
    this.router.navigateByUrl('backoffice/dashboard')
  }

  setResources(resources: ResourceModel[]): void {
    this.resources = [];
    this.resources = resources;
  }
}
