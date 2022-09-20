import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { Fee } from "@core/models";

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/fee`;
  }

  getOne(feeId: number): Observable<Fee> {
    return this.http.get<Fee>(`${this.uri}/${feeId}`);
  }

  updateTotal(feeId: number, total: number): Observable<Fee> {
    return this.http.patch<Fee>(`${this.uri}/total/${feeId}`, { total });
  }

  create(fee: Fee): Observable<Fee> {
    return this.http.post<Fee>(`${this.uri}`, fee);
  }

  getByInvoice(invoiceId: number): Observable<Fee[]> {
    return this.http.get<Fee[]>(`${this.uri}/invoice/${invoiceId}`);
  }

  getByProject(projectId: number): Observable<Fee[]> {
    return this.http.get<Fee[]>(`${this.uri}/project/${projectId}`);
  }
}
