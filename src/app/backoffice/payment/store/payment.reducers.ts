import {createReducer, on} from "@ngrx/store";

import {Fee, Invoice} from "@core/models";
import {appState} from "../../../app.reducers";
import {
  activeShowInvoiceDetail,
  feesLoadedSuccess,
  loadError,
  loadFees,
  loadPayment,
  loadPaymentsByProject,
  paymentLoadSuccess,
  paymentsLoadedSuccess,
  selectPayment
} from "./payment.actions";

export const paymentFeatureKey = 'paymentFeature';

export interface paymentState {
  invoices: Invoice[],
  invoice: Invoice,
  fees: Fee[],
  showInvoiceDetail: boolean,
  loaded: boolean,
  loading: boolean,
  error: any,
}

export interface AppStatePaymentFeature extends appState {
  paymentFeature: paymentState,
}

export const initialState: paymentState = {
  invoices: [],
  invoice: new Invoice(),
  fees: [],
  showInvoiceDetail: false,
  loaded: false,
  loading: false,
  error: null,
}

export const _paymentReducer = createReducer(
  initialState,
  on(loadPaymentsByProject, (state) => ({...state, loading: true})),
  on(paymentsLoadedSuccess, (state, {invoices}) => ({...state, loaded: true, loading: false, invoices: [...invoices]})),
  on(loadError, (state, {payload}) => ({...state, loaded: true, loading: false, error: {...payload}})),
  on(selectPayment, (state, {invoice}) => ({...state, invoice: {...invoice}, showInvoiceDetail: true})),
  on(activeShowInvoiceDetail, (state, {active}) => ({...state, showInvoiceDetail: active})),
  on(loadPayment, (state) => ({...state, loading: true})),
  on(paymentLoadSuccess, (state, {invoice}) => ({...state, invoice: {...invoice}, loading: false})),
  on(loadFees, (state) => ({...state, loading: true})),
  on(feesLoadedSuccess, (state, {fees}) => ({...state, loading: false, fees: [...fees]}))
)
