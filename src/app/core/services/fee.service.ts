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

  create(fee: Fee): Observable<Fee> {
    return this.http.post<Fee>(`${this.uri}`, fee);
  }

  getByInvoice(invoiceId: number): Observable<Fee[]> {
    return this.http.get<Fee[]>(`${this.uri}/invoice/${invoiceId}`);
  }

  update(fee: Fee): Observable<Fee> {
    return this.http.put<Fee>(`${this.uri}`, fee);
  }

  validate(feeId: number, fee: Fee): Observable<Fee> {
    return this.http.put<Fee>(`${this.uri}/validate/${feeId}`, fee);
  }
}
