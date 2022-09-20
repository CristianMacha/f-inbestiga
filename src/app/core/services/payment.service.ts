import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { PaymentCreateInterface } from "@core/interfaces";
import { PaymentModel } from "@core/models";
import { PaymentConceptEnum } from "@core/enums";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly uri: string;

  constructor(private http: HttpClient) {
    this.uri = `${environment.url}/payment`;
  }

  getTotalPaidOutFee(feeId: number): Observable<{ total: number | null }> {
    return this.http.get<{ total: number | null }>(`${this.uri}/total/fee/${feeId}`);
  }

  getByConcept(conceptId: number, concept: PaymentConceptEnum): Observable<PaymentModel[]> {
    return this.http.get<PaymentModel[]>(`${this.uri}/concept?conceptId=${conceptId}&concept=${concept}`);
  }

  createPaymentFee(paymentCreate: PaymentCreateInterface): Observable<PaymentModel> {
    return this.http.post<PaymentModel>(`${this.uri}`, paymentCreate);
  }

  approvePaymentFee(paymentId: number, approve: boolean): Observable<PaymentModel> {
    return this.http.post<PaymentModel>(`${this.uri}/approve/fee`, { paymentId, approve });
  }

  updateAmountFee(paymentId: number, amount: number): Observable<PaymentModel> {
    return this.http.patch<PaymentModel>(`${this.uri}/amount/fee`, { paymentId, amount });
  }

  update(paymentId: number, payment: PaymentModel): Observable<PaymentModel> {
    return this.http.put<PaymentModel>(`${this.uri}/${paymentId}`, payment);
  }

  getByInvoice(invoiceid: number): Observable<PaymentModel[]> {
    return this.http.get<PaymentModel[]>(`${this.uri}/invoice/${invoiceid}`);
  }
}
