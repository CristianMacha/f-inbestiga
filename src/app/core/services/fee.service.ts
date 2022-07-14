import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {environment} from "../../../environments/environment";
import {Fee} from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/fee`;
  }

  getByInvoice(invoiceId: number): Observable<Fee[]> {
    return this.http.get<Fee[]>(`${this.uri}/invoice/${invoiceId}`);
  }
}
