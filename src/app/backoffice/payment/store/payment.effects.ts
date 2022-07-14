import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, of, pipe} from "rxjs";

import {FeeService, InvoiceService} from "@core/services";
import {
  feesLoadedSuccess,
  loadError,
  loadFees,
  loadPayment,
  loadPayments,
  paymentLoadSuccess,
  paymentsLoadedSuccess
} from "./payment.actions";

@Injectable()
export class PaymentEffects {

  getInvoices$ = createEffect(() => this.actions$.pipe(
      ofType(loadPayments),
      mergeMap(
        (resp) => this.invoiceService.getInvoices()
          .pipe(
            map((resp) => paymentsLoadedSuccess({invoices: resp})),
            catchError((err) => of(loadError({payload: err})))
          )
      )
    ));

  getInvoice$ = createEffect(() => this.actions$.pipe(
    ofType(loadPayment),
    mergeMap((resp) => this.invoiceService.getInvoice(resp.invoiceId)
      .pipe(
        map((resp) => paymentLoadSuccess({invoice: resp})),
        catchError((err) => of(loadError({payload: err})))
      ))
  ));

  getFees$ = createEffect(() => this.actions$.pipe(
    ofType(loadFees),
    mergeMap((resp) => this.feeService.getByInvoice(resp.invoiceId)
      .pipe(
        map((resp) => feesLoadedSuccess({fees: resp})),
        catchError((err) => of(loadError({payload: err})))
      ))
  ));

  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService,
    private feeService: FeeService,
  ) {}
}
