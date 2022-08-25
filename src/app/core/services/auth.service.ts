import {Injectable} from '@angular/core';
import {catchError, map, Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {ILogin, ILoginResponse} from '@core/interfaces';
import {HttpClient} from '@angular/common/http';
import {Person, ResourceModel, User} from "@core/models";
import {Store} from "@ngrx/store";
import {appState} from "../../app.reducers";
import {loadResources, setUser} from "../../shared/ui.actions";
import {ResourceService} from "./resource.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = new User();
  person: Person = new Person();
  resources: ResourceModel[] = [];

  private readonly uri: string;

  constructor(
    private http: HttpClient,
    private store: Store<appState>,
    private resourceService: ResourceService,
  ) {
    this.uri = `${environment.url}/auth`;
  }

  login(login: ILogin): Observable<boolean> {
    return this.http.post<ILoginResponse>(`${this.uri}/signing`, login).pipe(
      map((resp) => {
        this.user = resp.userDb;
        this.resources = resp.resources;
        console.log('this.resources login ===>', this.resources)
        this.store.dispatch(loadResources({resources: this.resources}));
        this.store.dispatch(setUser({user: this.user}));
        this.setToken(resp.token);
        return true;
      })
    )
  }

  refreshToken(): Observable<boolean> {
    return this.http.get<ILoginResponse>(`${this.uri}/refresh-token`)
      .pipe(
        map((resp) => {
          this.user = resp.userDb;
          this.resources = resp.resources;
          console.log('this.resources refresh ===>', this.resources)
          this.store.dispatch(loadResources({resources: this.resources}));
          this.store.dispatch(setUser({user: this.user}));
          this.setToken(resp.token);
          return true;
        })
      )
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}
