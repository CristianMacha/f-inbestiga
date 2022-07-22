import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {Invoice} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/invoice`;
  }

  getByProject(projectId: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.uri}/project/${projectId}`);
  }

  getInvoices(roleId: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.uri}/role/${roleId}`);
  }

  getInvoice(invoiceId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.uri}/${invoiceId}`);
  }

  getByPerson(personId: number): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.uri}/person/${personId}`);
  }
}
