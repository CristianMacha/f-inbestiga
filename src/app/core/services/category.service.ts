import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Category} from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/category`;
  }

  public getActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.uri}/active`);
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.uri}/active`);
  }

  public getCategory(categoryId: number): Observable<Category> {
    return this.http.get<Category>(`${this.uri}/one/${categoryId}`);
  }

  public create(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.uri}`, category);
  }

  public update(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.uri}`, category);
  }
}
